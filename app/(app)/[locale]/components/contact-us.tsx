"use client";

import { Button } from "@/components/ui/button";
// import {
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   ChevronDownIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "lucide-react";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  contactFormSchema,
  type ContactFormValues,
  RECAPTCHA_ACTION,
} from "@/lib/contact-form";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
  // FieldContent,
  // FieldDescription,
  // FieldGroup,
  // FieldLegend,
  // FieldSeparator,
  // FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type SubmitState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const defaultValues = {
  name: "",
  company_name: "",
  message: "",
  email: "",
  // phone_number: "",
};

export const ContactUs = () => {
  const t = useTranslations("HomePage.ContactUs");
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    // disabled: LULCLoading,
  });

  // const [isOpen, setIsOpen] = useState(false);

  // const imageComp = useRef(null);
  // const imageMobile = useRef(null);
  const titleComp = useRef(null);

  // const imageIsInView = useInView(imageComp, { once: true });
  // const imageMobileIsInView = useInView(imageMobile, { once: true });
  useInView(titleComp, { once: true });

  useEffect(() => {
    const subscription = form.watch(() => {
      setSubmitState((currentState) =>
        currentState.type === "idle" ? currentState : { type: "idle" },
      );
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const getRecaptchaToken = async () => {
    if (!siteKey || !scriptLoaded || !window.grecaptcha) {
      throw new Error("captcha_not_ready");
    }

    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        window.grecaptcha
          ?.execute(siteKey, { action: RECAPTCHA_ACTION })
          .then(resolve)
          .catch(() => reject(new Error("captcha_execute_failed")));
      });
    });
  };

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitState({ type: "idle" });

    let recaptchaToken: string;

    try {
      recaptchaToken = await getRecaptchaToken();
    } catch {
      setSubmitState({
        type: "error",
        message: t("captchaError"),
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      let result: { ok: boolean; message?: string } | null = null;

      try {
        result = (await response.json()) as {
          ok: boolean;
          message?: string;
        };
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message ?? t("submitError"));
      }

      setSubmitState({
        type: "success",
        message: t("submitSuccess"),
      });
      form.reset(defaultValues);
    } catch {
      setSubmitState({
        type: "error",
        message: t("submitError"),
      });
    }

    return;
  };

  return (
    <div className="base-container flex flex-col items-center justify-start w-full px-2 max-lg:mt-6  max-lg:mb-3 lg:my-15 xl:my-20">
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
          onError={() => setScriptLoaded(false)}
        />
      ) : null}
      <div className="w-full relative py-6 max-lg:pt-0 max-lg:pb-0 lg:py-0">
        <motion.p
          ref={titleComp}
          // initial={{ y: "100%", opacity: 0 }}
          // animate={{
          //   y: titleIsInView ? 0 : "100%",
          //   opacity: 1,
          //   transition: {
          //     visualDuration: 2,
          //   },
          // }}
          className="font-lp-headline-xxs-bold lg:font-lp-headline-l-bold xl:font-lp-headline-xl-bold text-text-icons-base-main text-center lg:text-left"
        >
          {t("title")}
        </motion.p>
        <div className="rounded-2xl bg-primary-second w-full p-2 max-lg:pb-3 max-lg:px-2 lg:p-8 mt-3 lg:mt-10">
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet className="grid grid-cols-12 gap-y-2.5 lg:gap-y-6 lg:gap-x-6">
              {/* <FieldGroup> */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"vertical"}
                    className="col-span-12 lg:col-span-4 max-lg:gap-0"
                  >
                    <FieldLabel className="max-lg:leading-6" htmlFor="name">
                      {/* WIP NO MOBILE DESIGN SYSTEM */}
                      <p className="max-lg:font-aptos max-lg:text-[13px] max-lg:font-semibold max-lg:leading-6 lg:font-lp-text-m-semibold text-text-icons-base-main">
                        {t("firstName")}
                      </p>
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="bg-white text-xs lg:text-[15px]"
                      id="name"
                      autoComplete="off"
                      placeholder={t("firstNamePlaceholder")}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"vertical"}
                    className="col-span-12 lg:col-span-4 max-lg:gap-0"
                  >
                    <FieldLabel className="max-lg:leading-6" htmlFor="email">
                      {/* WIP NO MOBILE DESIGN SYSTEM */}
                      <p className="max-lg:font-aptos max-lg:text-[13px] max-lg:font-semibold max-lg:leading-6 lg:font-lp-text-m-semibold text-text-icons-base-main">
                        {t("email")}
                      </p>
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="bg-white text-xs lg:text-[15px]"
                      id="email"
                      autoComplete="off"
                      placeholder={t("emailPlaceholder")}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* <Controller
                name="phone_number"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"vertical"}
                    className="col-span-12 lg:col-span-4 max-lg:gap-0"
                  >
                    <FieldLabel
                      className="max-lg:leading-6"
                      htmlFor="phone_number"
                    >
                      <p className="max-lg:font-aptos max-lg:text-[13px] max-lg:font-semibold max-lg:leading-6 lg:font-lp-text-m-semibold text-text-icons-base-main">
                        {t("phoneNumber")}
                      </p>
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="bg-white text-xs lg:text-[15px]"
                      id="phone_number"
                      autoComplete="off"
                      type="tel"
                      placeholder={t("phoneNumberPlaceholder")}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              /> */}
              <Controller
                name="company_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"vertical"}
                    className="lg:hidden flex col-span-12 lg:col-span-4 max-lg:gap-0"
                  >
                    <FieldLabel
                      className="max-lg:leading-6"
                      htmlFor="company_name"
                    >
                      {/* WIP NO MOBILE DESIGN SYSTEM */}
                      <p className="max-lg:font-aptos max-lg:text-[13px] max-lg:font-semibold max-lg:leading-6 lg:font-lp-text-m-semibold text-text-icons-base-main">
                        {t("companyName")}
                      </p>
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="bg-white text-xs lg:text-[15px]"
                      id="company_name"
                      autoComplete="off"
                      placeholder={t("companyNamePlaceholder")}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="hidden lg:flex col-span-4 flex-col gap-y-6">
                <Controller
                  name="company_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation={"vertical"}
                      className="col-span-6 lg:col-span-4"
                    >
                      <FieldLabel
                        className="max-lg:leading-6"
                        htmlFor="company_name"
                      >
                        {/* WIP NO MOBILE DESIGN SYSTEM */}
                        <p className="max-lg:font-aptos max-lg:text-[13px] max-lg:font-semibold max-lg:leading-6 lg:font-lp-text-m-semibold text-text-icons-base-main">
                          {t("companyName")}
                        </p>
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className="bg-white text-xs lg:text-[15px]"
                        id="company_name"
                        autoComplete="off"
                        placeholder={t("companyNamePlaceholder")}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="col-span-12 grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-8">
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        orientation={"vertical"}
                        className="max-lg:gap-0"
                        // className="col-span-12 lg:col-span-8 max-lg:gap-0"
                      >
                        <FieldLabel
                          className="max-lg:leading-6"
                          htmlFor="message-contac"
                        >
                          {/* WIP NO MOBILE DESIGN SYSTEM */}
                          <p className="max-lg:font-aptos max-lg:text-[13px] max-lg:font-semibold max-lg:leading-6 lg:font-lp-text-m-semibold text-text-icons-base-main">
                            {t("message")}
                          </p>
                        </FieldLabel>

                        <Textarea
                          {...field}
                          aria-invalid={fieldState.invalid}
                          className="bg-white h-full text-xs lg:text-[15px]"
                          id="message-contac"
                          autoComplete="off"
                          placeholder={t("messagePlaceholder")}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="hidden lg:flex col-span-4 space-y-6 flex-col justify-end">
                  <p className="font-text-s-medium text-text-icons-base-second">
                    {t("disclaimer")}
                  </p>
                  {submitState.type !== "idle" ? (
                    <p
                      className={`font-text-s-medium ${
                        submitState.type === "success"
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {submitState.message}
                    </p>
                  ) : null}
                  <Button
                    variant={"primary"}
                    className="h-auto py-3 px-5 w-fit"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    <p className="font-text-button-semibold-large text-text-icons-on-color">
                      {form.formState.isSubmitting
                        ? t("submitting")
                        : t("sendMessage")}
                    </p>
                  </Button>
                </div>
              </div>
              <div className="lg:hidden col-span-12 flex flex-row justify-between gap-y-6 mt-2">
                <div className="w-31">
                  {/* WIP NO MOBILE DESIGN SYSTEM */}
                  <p className="font-inter text-[9px] font-medium text-text-icons-base-second max-w-40 col-span-3">
                    {t("disclaimer")}
                  </p>
                  {submitState.type !== "idle" ? (
                    <p
                      className={`mt-2 font-inter text-[9px] font-medium ${
                        submitState.type === "success"
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {submitState.message}
                    </p>
                  ) : null}
                </div>
                <Button
                  variant={"primary"}
                  className="h-auto py-1 px-2 col-span-9 rounded-md"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  <p className="font-text-xs-semibold text-text-icons-on-color">
                    {form.formState.isSubmitting
                      ? t("submitting")
                      : t("sendMessage")}
                  </p>
                </Button>
              </div>
            </FieldSet>
          </form>
        </div>
      </div>
    </div>
  );
};
