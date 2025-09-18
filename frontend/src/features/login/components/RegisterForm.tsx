// File: frontend/src/features/login/components/RegisterForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LogIn, Mail, X } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { FieldsetInput } from "@/components/form";
import { Modal } from "@/components/ui";
import { useRegister } from "../api";
import { BaseForm } from "./BaseForm";

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const RegisterForm: React.FC = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailErrorDialog, setShowEmailErrorDialog] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { t } = useTranslation();
  
  const { mutateAsync: register } = useRegister({
    onEmailError: (errorMessage: string) => {
      setEmailErrorMessage(errorMessage);
      setShowEmailErrorDialog(true);
    },
  });

  const refinedSchema = useMemo(
    () =>
      schema.refine((data) => data.password === data.confirmPassword, {
        message: t("Passwords do not match"),
        path: ["confirmPassword"],
      }),
    [t],
  );

  const form = useForm<Schema>({
    resolver: zodResolver(refinedSchema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    trigger,
    watch,
  } = form;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password && confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setIsLoading(true);
    try {
      await register(data);
    } catch (_e) {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowEmailErrorDialog(false);
    setEmailErrorMessage("");
  };

  return (
    <>
      <BaseForm onSubmit={onSubmit} form={form} dataTestId="register-form">
        <legend className="fieldset-legend">{t("Register")}</legend>
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
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<KeyRound size={16} />}
              label={t("Password")}
              errorMessage={errors?.password?.message}
              placeholder={t("Enter your password")}
              type="password"
              dataTestId="password-input"
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<KeyRound size={16} />}
              label={t("Confirm password")}
              errorMessage={errors?.confirmPassword?.message}
              placeholder={t("Confirm your password")}
              type="password"
              dataTestId="confirm-password-input"
              {...field}
            />
          )}
        />
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading || !isDirty || !isValid}
          data-testid="submit-button"
        >
          {isLoading ? <span className="loading loading-spinner" /> : <LogIn />}
          {t("Register")}
        </button>
      </BaseForm>

      <Modal isOpen={showEmailErrorDialog} onClose={handleCloseDialog}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-error">{t("Registration Error")}</h3>
            <button
              onClick={handleCloseDialog}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-base-content">{emailErrorMessage}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseDialog}
              className="btn btn-primary"
              data-testid="close-dialog-button"
            >
              {t("OK")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
});