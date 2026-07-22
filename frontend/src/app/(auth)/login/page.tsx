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
      <AuthForm submitLabel="ログイン" />
    </AuthCard>
  );
}
