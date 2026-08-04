"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FlashMessage } from "@/components/ui/FlashMessage";
import { consumeFlash } from "@/lib/flash";

export function FlashBanner() {
  const pathname = usePathname();
  const [flash, setFlash] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const consumedForPathname = useRef<string | null>(null);

  useEffect(() => {
    if (consumedForPathname.current === pathname) return;
    consumedForPathname.current = pathname;
    setFlash(consumeFlash());
  }, [pathname]);

  if (!flash) return null;

  return (
    <div className="flex justify-center px-4 pt-4">
      <FlashMessage type={flash.type} message={flash.message} />
    </div>
  );
}
