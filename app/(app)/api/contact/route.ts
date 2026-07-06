import {
  contactFormSubmitSchema,
  DEFAULT_RECAPTCHA_MIN_SCORE,
  RECAPTCHA_ACTION,
} from "@/lib/contact-form";
import { NextResponse } from "next/server";

type RecaptchaVerificationResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type ContactSubmitErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
  trace?: string;
  success?: boolean;
};

const genericErrorMessage =
  "We couldn't submit your message right now. Please try again.";

export async function POST(request: Request) {
  const siteSecret = process.env.RECAPTCHA_SECRET_KEY;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!siteSecret) {
    return NextResponse.json(
      {
        ok: false,
        code: "captcha_not_configured",
        message: genericErrorMessage,
      },
      { status: 500 },
    );
  }

  if (!apiBaseUrl) {
    return NextResponse.json(
      {
        ok: false,
        code: "api_not_configured",
        message: genericErrorMessage,
      },
      { status: 500 },
    );
  }

  const configuredMinScore = Number(
    process.env.RECAPTCHA_MIN_SCORE ?? DEFAULT_RECAPTCHA_MIN_SCORE,
  );
  const minScore = Number.isFinite(configuredMinScore)
    ? configuredMinScore
    : DEFAULT_RECAPTCHA_MIN_SCORE;

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "invalid_json",
        message: genericErrorMessage,
      },
      { status: 400 },
    );
  }

  const parsedPayload = contactFormSubmitSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "invalid_payload",
        message: genericErrorMessage,
      },
      { status: 400 },
    );
  }

  const verificationBody = new URLSearchParams({
    secret: siteSecret,
    response: parsedPayload.data.recaptchaToken,
  });

  let verificationResponse: Response;

  try {
    verificationResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: verificationBody.toString(),
        cache: "no-store",
      },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "captcha_verification_failed",
        message: genericErrorMessage,
      },
      { status: 502 },
    );
  }

  if (!verificationResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: "captcha_verification_failed",
        message: genericErrorMessage,
      },
      { status: 502 },
    );
  }

  const verificationResult =
    (await verificationResponse.json()) as RecaptchaVerificationResponse;

  if (!verificationResult.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "captcha_failed",
        message: genericErrorMessage,
      },
      { status: 400 },
    );
  }

  if (verificationResult.action !== RECAPTCHA_ACTION) {
    return NextResponse.json(
      {
        ok: false,
        code: "captcha_action_mismatch",
        message: genericErrorMessage,
      },
      { status: 400 },
    );
  }

  if ((verificationResult.score ?? 0) < minScore) {
    return NextResponse.json(
      {
        ok: false,
        code: "captcha_score_too_low",
        message: genericErrorMessage,
      },
      { status: 400 },
    );
  }

  const contactPayload = {
    full_name: parsedPayload.data.name,
    email: parsedPayload.data.email,
    message: parsedPayload.data.message,
    company_name: parsedPayload.data.company_name || undefined,
  };

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(
      `${apiBaseUrl}/api/v1/contact/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactPayload),
        cache: "no-store",
      },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "contact_submit_failed",
        message: genericErrorMessage,
      },
      { status: 502 },
    );
  }

  if (!upstreamResponse.ok) {
    let errorPayload: ContactSubmitErrorResponse | null = null;

    try {
      errorPayload = (await upstreamResponse.json()) as ContactSubmitErrorResponse;
    } catch {
      errorPayload = null;
    }

    return NextResponse.json(
      {
        ok: false,
        code: errorPayload?.error?.code ?? "contact_submit_failed",
        message: errorPayload?.error?.message ?? genericErrorMessage,
      },
      { status: upstreamResponse.status },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Your message has been sent successfully.",
  });
}
