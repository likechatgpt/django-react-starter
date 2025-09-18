// File: features/login/components/BaseForm.tsx
import { memo, type ReactNode } from "react";
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type BaseFormProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  form: UseFormReturn<T, any, T>;
  dataTestId?: string;
};

const BaseFormInner = <T extends FieldValues>({
  children,
  onSubmit,
  form,
  dataTestId,
}: BaseFormProps<T>) => {
  return (
    <form
      className="flex flex-col gap-4 justify-center max-w-100 mx-auto"
      data-testid={dataTestId}
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
        {children}
      </fieldset>
    </form>
  );
};

export const BaseForm = memo(BaseFormInner) as <T extends FieldValues>(
  props: BaseFormProps<T>
) => JSX.Element;