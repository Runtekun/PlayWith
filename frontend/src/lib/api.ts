const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiValidationError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.errors = errors;
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
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

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(data?.message ?? "通信に失敗しました", response.status);
  }

  return data as T;
}

async function apiSend<T>(
  method: "POST" | "PUT",
  path: string,
  body: unknown,
): Promise<T> {
  await ensureCsrfCookie();

  const xsrfToken = decodeURIComponent(getCookie("XSRF-TOKEN") ?? "");

  const response = await fetch(`${API_URL}${path}`, {
    method,
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

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return apiSend<T>("POST", path, body);
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return apiSend<T>("PUT", path, body);
}
