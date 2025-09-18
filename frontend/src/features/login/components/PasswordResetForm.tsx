// File: features/login/components/PasswordResetForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftToLine, Mail, Send } from "lucide-react";
import { memo, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Link } from "wouter";
import { z } from "zod";
import { FieldsetInput } from "@/components/form";
import { routeConfigMap } from "@/router";
import { usePasswordReset } from "../api";
import { BaseForm } from "./BaseForm";

const schema = z.object({
  email: z.string().nonempty().email(),
});

type Schema = z.infer<typeof schema>;

export const PasswordResetForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { mutateAsync: passwordReset } = usePasswordReset();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
  } = form;

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setIsLoading(true);
    try {
      await passwordReset(data);
      toast.success(t("An email has been sent to reset your password"));
    } catch (_e) {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm onSubmit={onSubmit} form={form} dataTestId="password-reset-form">
      <legend className="fieldset-legend">{t("Password reset")}</legend>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FieldsetInput
            icon={<Mail size={16} />}
            label={t("Email")}
            errorMessage={errors?.email?.message}
            placeholder={t("Enter your email address")}
            type="email"
            dataTestId="email-input"
            {...field}
          />
        )}
      />
      <div className="flex gap-2 mt-4">
        <Link
          className="btn btn-outline w-1/2"
          data-testid="go-back-button"
          href={routeConfigMap.login.path}
        >
          <ArrowLeftToLine />
          {t("Go back")}
        </Link>
        <button
          type="submit"
          className="btn btn-primary w-1/2"
          disabled={isLoading || !isDirty || !isValid}
          data-testid="submit-button"
        >
          {isLoading ? <span className="loading loading-spinner" /> : <Send />}
          {t("Reset")}
        </button>
      </div>
    </BaseForm>
  );
});