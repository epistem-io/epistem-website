"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PASSWORD_RULES = {
  minLength: /^.{8,}$/,
  lowercaseUppercase: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  number: /^(?=.*\d).+$/,
  specialCharacter: /^(?=.*[^A-Za-z0-9]).+$/,
} as const;

type SetPasswordValues = {
  fullname: string;
  organizationName: string;
  password: string;
  confirmPassword: string;
};

type SetPasswordProps = {
  slug: string;
};

// Who the token belongs to (GET set-password/<token>).
type TokenInfo = {
  email: string;
  fullname: string;
  organization_name: string;
  invited: boolean;
  invited_by: string | null;
};

// info === null: the backend has no token lookup yet (older API). The page
// then behaves as before — password fields only — instead of blocking signup.
type TokenState =
  | { type: "loading" }
  | { type: "invalid" }
  | { type: "ready"; info: TokenInfo | null };

type SubmitState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; redirecting: boolean }
  | { type: "error"; message: string };

const SET_PASSWORD_API = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/account/set-password`;
const MAX_TEXT_LENGTH = 256;

function RequirementItem({
  label,
  satisfied,
}: {
  label: string;
  satisfied: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full transition-colors",
          satisfied ? "bg-primary-red-pink-light" : "bg-transparent",
        )}
      >
        <Check
          className={cn(
            "size-3.5",
            satisfied ? "text-primary-pink" : "text-muted-foreground/60",
          )}
          strokeWidth={2.4}
        />
      </div>
      <p
        className={cn(
          "font-lp-text-xs-semibold transition-colors",
          satisfied ? "text-primary-pink" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
    </div>
  );
}

export default function SetPassword({ slug }: SetPasswordProps) {
  const t = useTranslations("Auth.SetPassword");
  const locale = useLocale();
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });
  const [tokenState, setTokenState] = useState<TokenState>({ type: "loading" });
  const tokenInfo = tokenState.type === "ready" ? tokenState.info : null;
  const hasProfileFields = tokenInfo !== null;

  const setPasswordSchema = useMemo(
    () =>
      z
        .object({
          // Required only when the profile fields are shown.
          fullname: hasProfileFields
            ? z
                .string()
                .trim()
                .min(1, t("errors.nameRequired"))
                .max(MAX_TEXT_LENGTH, t("errors.tooLong"))
            : z.string(),
          organizationName: z
            .string()
            .trim()
            .max(MAX_TEXT_LENGTH, t("errors.tooLong")),
          password: z.string().min(8, t("errors.minLength")),
          // .regex(PASSWORD_RULES.lowercaseUppercase, t("errors.lowercaseUppercase"))
          // .regex(PASSWORD_RULES.number, t("errors.number"))
          // .regex(PASSWORD_RULES.specialCharacter, t("errors.specialCharacter")),
          confirmPassword: z.string().min(1, t("errors.confirmRequired")),
        })
        .refine((data) => data.password === data.confirmPassword, {
          path: ["confirmPassword"],
          message: t("errors.passwordMismatch"),
        }),
    [t, hasProfileFields],
  );

  const form = useForm<SetPasswordValues>({
    resolver: zodResolver(setPasswordSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      organizationName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { reset } = form;

  useEffect(() => {
    let cancelled = false;

    fetch(`${SET_PASSWORD_API}/${slug}`)
      .then(async (response) => {
        if (cancelled) return;
        // 400 = the API looked the token up and rejected it.
        if (response.status === 400) {
          setTokenState({ type: "invalid" });
          return;
        }
        // Anything else that isn't OK (404/405 from an API without the lookup
        // route, 5xx): fall back to the password-only form.
        if (!response.ok) {
          setTokenState({ type: "ready", info: null });
          return;
        }
        const info = (await response.json()) as TokenInfo;
        if (cancelled) return;
        reset({
          fullname: info.fullname ?? "",
          organizationName: info.organization_name ?? "",
          password: "",
          confirmPassword: "",
        });
        setTokenState({ type: "ready", info });
      })
      .catch(() => {
        if (!cancelled) setTokenState({ type: "ready", info: null });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, reset]);

  const passwordValue = form.watch("password");
  const confirmPasswordValue = form.watch("confirmPassword");

  const passwordChecks = useMemo(
    () => [
      // {
      //   key: "lowercaseUppercase",
      //   label: t("requirements.lowercaseUppercase"),
      //   satisfied: PASSWORD_RULES.lowercaseUppercase.test(passwordValue),
      // },
      // {
      //   key: "number",
      //   label: t("requirements.number"),
      //   satisfied: PASSWORD_RULES.number.test(passwordValue),
      // },
      // {
      //   key: "specialCharacter",
      //   label: t("requirements.specialCharacter"),
      //   satisfied: PASSWORD_RULES.specialCharacter.test(passwordValue),
      // },
      {
        key: "minLength",
        label: t("requirements.minLength"),
        satisfied: PASSWORD_RULES.minLength.test(passwordValue),
      },
    ],
    [passwordValue, t],
  );

  const isSubmitDisabled =
    submitState.type === "submitting" ||
    !form.formState.isValid ||
    !passwordValue ||
    !confirmPasswordValue;

  const onSubmit = async ({
    fullname,
    organizationName,
    password,
  }: SetPasswordValues) => {
    setSubmitState({ type: "submitting" });

    try {
      // The email is deliberately never sent: the server takes it from the
      // token, so the locked field cannot be bypassed.
      const response = await fetch(`${SET_PASSWORD_API}/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          hasProfileFields
            ? {
                password,
                fullname: fullname.trim(),
                organization_name: organizationName.trim(),
              }
            : { password },
        ),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      const data = (await response.json().catch(() => null)) as {
        login_code?: string;
      } | null;
      const lumaUrl = process.env.NEXT_PUBLIC_LUMA_URL?.replace(/\/$/, "");

      if (lumaUrl && data?.login_code) {
        // One-time, 60-second code: Luma trades it for a session on arrival,
        // so the user lands already logged in. The real token never enters a URL.
        setSubmitState({ type: "success", redirecting: true });
        window.location.assign(
          `${lumaUrl}/${locale}?login_code=${encodeURIComponent(data.login_code)}`,
        );
        return;
      }

      setSubmitState({ type: "success", redirecting: false });
    } catch {
      setSubmitState({
        type: "error",
        message: t("submitError"),
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-48px)] items-center justify-center bg-white px-4 py-6 lg:px-16 lg:py-6">
      <div className="w-full max-w-[400px] rounded-2xl bg-white">
        <div className="flex flex-col gap-1.5 px-6 pt-6">
          <h1 className="font-lp-headline-xs-bold text-foreground">
            {t("title")}
          </h1>
          <p className="font-text-s-medium text-muted-foreground">
            {tokenInfo?.invited && tokenInfo.invited_by
              ? t("invitedDescription", { inviter: tokenInfo.invited_by })
              : t("description")}
          </p>
        </div>

        {tokenState.type === "loading" ? (
          <p
            role="status"
            className="px-6 pb-6 pt-4 font-text-s-medium text-muted-foreground"
          >
            {t("loading")}
          </p>
        ) : tokenState.type === "invalid" ? (
          <div className="px-6 pb-6 pt-4">
            <div role="alert" className="rounded-2xl border border-border px-4 py-5">
              <h2 className="font-lp-text-l-semibold text-text-icons-base-main">
                {t("invalidTitle")}
              </h2>
              <p className="font-lp-text-s-regular mt-2 text-text-icons-base-second">
                {t("invalidMessage")}
              </p>
            </div>
          </div>
        ) : submitState.type === "success" ? (
          <div className="px-6 pb-6 pt-4">
            <div className="rounded-2xl border border-primary-red-pink-light bg-primary-red-pink-light px-4 py-5">
              <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary-pink text-white">
                <Check className="size-5" strokeWidth={2.5} />
              </div>
              <h2 className="font-lp-text-l-semibold text-text-icons-base-main">
                {t("successTitle")}
              </h2>
              <p className="font-lp-text-s-regular mt-2 text-text-icons-base-second">
                {submitState.redirecting
                  ? t("redirecting")
                  : t("successMessage")}
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-6 pb-6 pt-4"
          >
            {tokenInfo ? (
              <>
                {/* Display-only and outside react-hook-form on purpose: the
                    account is tied to this address and it is never submitted. */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-text-s-medium text-foreground"
                  >
                    {t("emailLabel")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={tokenInfo.email}
                    disabled
                    readOnly
                    aria-describedby="email-hint"
                    className="h-10 rounded-md border-input bg-muted px-3 py-2.5 text-sm text-muted-foreground"
                  />
                  <p
                    id="email-hint"
                    className="font-lp-text-xs-semibold text-muted-foreground"
                  >
                    {t("emailHint")}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullname"
                    className="font-text-s-medium text-foreground"
                  >
                    {t("nameLabel")}
                  </label>
                  <Input
                    id="fullname"
                    type="text"
                    autoComplete="name"
                    maxLength={MAX_TEXT_LENGTH}
                    placeholder={t("namePlaceholder")}
                    aria-invalid={
                      form.formState.errors.fullname ? "true" : "false"
                    }
                    className="h-10 rounded-md border-input bg-white px-3 py-2.5 text-sm"
                    {...form.register("fullname")}
                  />
                  {form.formState.errors.fullname ? (
                    <FieldError errors={[form.formState.errors.fullname]} />
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="organizationName"
                    className="font-text-s-medium text-foreground"
                  >
                    {t("organizationLabel")}
                  </label>
                  <Input
                    id="organizationName"
                    type="text"
                    autoComplete="organization"
                    maxLength={MAX_TEXT_LENGTH}
                    placeholder={t("organizationPlaceholder")}
                    className="h-10 rounded-md border-input bg-white px-3 py-2.5 text-sm"
                    {...form.register("organizationName")}
                  />
                  {form.formState.errors.organizationName ? (
                    <FieldError
                      errors={[form.formState.errors.organizationName]}
                    />
                  ) : null}
                </div>
              </>
            ) : null}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-text-s-medium text-foreground"
              >
                {t("passwordLabel")}
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={form.formState.errors.password ? "true" : "false"}
                className="h-10 rounded-md border-input bg-white px-3 py-2.5 text-sm"
                {...form.register("password")}
              />
              {form.formState.errors.password ? (
                <FieldError errors={[form.formState.errors.password]} />
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              {passwordChecks.map((item) => (
                <RequirementItem
                  key={item.key}
                  label={item.label}
                  satisfied={item.satisfied}
                />
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="font-text-s-medium text-foreground"
              >
                {t("confirmPasswordLabel")}
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={
                  form.formState.errors.confirmPassword ? "true" : "false"
                }
                className="h-10 rounded-md border-input bg-white px-3 py-2.5 text-sm"
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword ? (
                <FieldError errors={[form.formState.errors.confirmPassword]} />
              ) : null}
            </div>

            {submitState.type === "error" ? (
              <FieldError>{submitState.message}</FieldError>
            ) : null}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitDisabled}
                className="h-10 w-full rounded-xl font-text-s-medium"
              >
                {submitState.type === "submitting"
                  ? t("submitting")
                  : t("submit")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
