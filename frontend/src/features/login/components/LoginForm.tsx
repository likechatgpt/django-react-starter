// File: src/features/login/components/LoginForm.tsx
import { useState } from "react";
import { Mail, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FieldsetInput } from "@/components/form";
import { useLogin } from "../api/useLogin";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset className="fieldset">
        <FieldsetInput
          icon={<Mail size={16} />}
          label={t("Email")}
          placeholder={t("Enter your email address")}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dataTestId="email-input"
          required
        />
        <FieldsetInput
          icon={<KeyRound size={16} />}
          label={t("Password")}
          placeholder={t("Enter your password")}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          dataTestId="password-input"
          required
        />
      </fieldset>
      <button
        type="submit"
        disabled={loginMutation.isPending || !email || !password}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loginMutation.isPending ? t("Loading...") : t("Sign In")}
      </button>
    </form>
  );
};