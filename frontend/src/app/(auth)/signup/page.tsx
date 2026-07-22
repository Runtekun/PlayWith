import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <AuthCard
      title="新規登録"
      footerText="アカウントをお持ちの方は"
      footerLinkText="ログイン"
      footerLinkHref="/login"
    >
      <AuthForm submitLabel="新規登録" />
    </AuthCard>
  );
}
