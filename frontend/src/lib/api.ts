const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiValidationError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

function getCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

async function ensureCsrfCookie(): Promise<void> {
  if (getCookie("XSRF-TOKEN")) return;

  await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  await ensureCsrfCookie();

  const xsrfToken = decodeURIComponent(getCookie("XSRF-TOKEN") ?? "");

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": xsrfToken,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);

  if (response.status === 422) {
    throw new ApiValidationError(
      data?.message ?? "入力内容を確認してください",
      data?.errors ?? {},
    );
  }

  if (!response.ok) {
    throw new Error(data?.message ?? "通信に失敗しました");
  }

  return data as T;
}
