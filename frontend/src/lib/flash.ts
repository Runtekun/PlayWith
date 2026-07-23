const FLASH_KEY = "playwith:flash";

type FlashType = "success" | "error";

type Flash = {
  type: FlashType;
  message: string;
};

export function setFlash(type: FlashType, message: string): void {
  sessionStorage.setItem(FLASH_KEY, JSON.stringify({ type, message }));
}

export function consumeFlash(): Flash | null {
  const raw = sessionStorage.getItem(FLASH_KEY);
  if (!raw) return null;

  sessionStorage.removeItem(FLASH_KEY);

  try {
    return JSON.parse(raw) as Flash;
  } catch {
    return null;
  }
}
