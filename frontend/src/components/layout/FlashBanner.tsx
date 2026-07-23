"use client";

import { useEffect, useRef, useState } from "react";
import { FlashMessage } from "@/components/ui/FlashMessage";
import { consumeFlash } from "@/lib/flash";

export function FlashBanner() {
  const [flash, setFlash] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const hasConsumed = useRef(false);

  useEffect(() => {
    if (hasConsumed.current) return;
    hasConsumed.current = true;
    setFlash(consumeFlash());
  }, []);

  if (!flash) return null;

  return (
    <div className="px-4 pt-4">
      <FlashMessage type={flash.type} message={flash.message} />
    </div>
  );
}
