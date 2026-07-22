import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

export function AuthCard({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-10">
      <span className="mb-8 text-2xl font-bold text-foreground">PlayWith</span>
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_6px_0_#e8dcc8]">
        <h1 className="mb-6 text-center text-lg font-bold text-foreground">
          {title}
        </h1>
        {children}
      </div>
      <p className="mt-6 text-sm text-muted">
        {footerText}{" "}
        <Link href={footerLinkHref} className="font-bold text-primary">
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
