type AuthFormProps = {
  submitLabel: string;
};

export function AuthForm({ submitLabel }: AuthFormProps) {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-bold text-muted">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-bold text-muted">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_3px_0_var(--primary-shadow)]"
      >
        {submitLabel}
      </button>

      <div className="my-1 flex items-center gap-3">
        <span className="h-px flex-1 bg-black/10" />
        <span className="text-xs text-muted-light">または</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-bold text-foreground"
      >
        <GoogleIcon />
        Googleでログイン
      </button>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.48a5.54 5.54 0 01-2.4 3.63v3h3.88c2.27-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.11A12 12 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28V6.61H1.27A12 12 0 000 12c0 1.94.46 3.77 1.27 5.39l4-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}
