"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
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
        onSubmit={async () => {
          // TODO: ログインAPI実装後に接続する
          throw new Error("ログイン機能は準備中です");
        }}
      />
    </AuthCard>
  );
}
