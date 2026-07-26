"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { apiPost } from "@/lib/api";
import { setFlash } from "@/lib/flash";

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    setIsMenuOpen(false);
    await apiPost("/api/logout", {});
    setFlash("success", "ログアウトしました");
    router.push("/login");
  }

  return (
    <header className="relative flex items-center justify-between bg-background px-4 py-3">
      <span className="text-base font-bold text-foreground">PlayWith</span>
      <div className="flex items-center gap-5">
        <Bell size={18} strokeWidth={2} className="text-foreground" />
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white"
        >
          {/* TODO: ユーザーアバター画像に差し替え */}
          Y
        </button>
      </div>

      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-4 top-14 z-20 w-36 overflow-hidden rounded-2xl bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-bold text-foreground hover:bg-black/5"
            >
              <LogOut size={16} strokeWidth={2} />
              ログアウト
            </button>
          </div>
        </>
      )}
    </header>
  );
}
