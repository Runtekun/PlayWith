"use client";

import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { apiPost } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthCard
      title="新規登録"
      footerText="アカウントをお持ちの方は"
      footerLinkText="ログイン"
      footerLinkHref="/login"
    >
      <AuthForm
        mode="signup"
        submitLabel="新規登録"
        onSubmit={async ({ name, email, password, passwordConfirmation }) => {
          await apiPost("/api/register", {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          });

          setTimeout(() => {
            router.push("/");
          }, 1000);
        }}
      />
    </AuthCard>
  );
}
