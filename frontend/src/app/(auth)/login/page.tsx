"use client";

import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { apiPost } from "@/lib/api";
import { setFlash } from "@/lib/flash";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthCard
      title="ログイン"
      footerText="アカウントをお持ちでない方は"
      footerLinkText="新規登録"
      footerLinkHref="/signup"
    >
      <AuthForm
        mode="login"
        submitLabel="ログイン"
        onSubmit={async ({ email, password }) => {
          await apiPost("/api/login", { email, password });

          setFlash("success", "ログインしました");
          router.push("/");
        }}
      />
    </AuthCard>
  );
}
