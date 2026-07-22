"use client";

import { Home, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "スワイプ", icon: Home },
  { href: "/chats", label: "チャット", icon: MessageCircle },
  { href: "/profile", label: "マイページ", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around border-t border-black/5 bg-white py-2.5">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                isActive ? "bg-primary" : "bg-gray-100"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={2.5}
                className={isActive ? "text-white" : "text-gray-400"}
              />
            </span>
            <span
              className={`text-[9px] ${
                isActive ? "font-bold text-primary" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
