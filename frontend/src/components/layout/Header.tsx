import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-background px-4 py-3">
      <span className="text-base font-bold text-foreground">PlayWith</span>
      <div className="flex items-center gap-5">
        <Bell size={18} strokeWidth={2} className="text-foreground" />
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
          {/* TODO: ユーザーアバター画像に差し替え */}
          Y
        </div>
      </div>
    </header>
  );
}
