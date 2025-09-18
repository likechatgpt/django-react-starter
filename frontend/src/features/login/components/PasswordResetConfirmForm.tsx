// File: features/login/components/PasswordResetConfirmForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftToLine, LockKeyhole, Save } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Link, useParams } from "wouter";
import { z } from "zod";
import { FieldsetInput } from "@/components/form";
import { routeConfigMap } from "@/router";
import { usePasswordResetConfirm } from "../api";
import { BaseForm } from "./BaseForm";

const schema = z.object({
  password: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export type PasswordResetConfirmFormProps = {
  uid?: string;
  token?: string;
};

export const PasswordResetConfirmForm: React.FC<PasswordResetConfirmFormProps> = memo(
  ({ uid, token }) => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const effectiveUid = uid || params.uid;
    const effectiveToken = token || params.token;
    const { t } = useTranslation();
    const { mutateAsync: passwordResetConfirm } = usePasswordResetConfirm(
      effectiveUid,
      effectiveToken,
    );

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
      watch,
      trigger,
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
        await passwordResetConfirm(data);
        toast.success(t("Password updated"));
      } catch (_e) {
        setIsLoading(false);
      }
    };

    return (
      <BaseForm
        onSubmit={onSubmit}
        form={form}
        dataTestId="password-reset-confirm-form"
      >
        <legend className="fieldset-legend">{t("Password reset confirm")}</legend>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FieldsetInput
              icon={<LockKeyhole size={16} />}
              label={t("Password")}
              errorMessage={errors?.password?.message}
              placeholder={t("Enter your new password")}
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
              icon={<LockKeyhole size={16} />}
              label={t("Confirm password")}
              errorMessage={errors?.confirmPassword?.message}
              placeholder={t("Confirm your password")}
              type="password"
              dataTestId="confirm-password-input"
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
            {isLoading ? <span className="loading loading-spinner" /> : <Save />}
            {t("Save")}
          </button>
        </div>
      </BaseForm>
    );
  },
);