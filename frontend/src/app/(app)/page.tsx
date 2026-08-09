"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiGet } from "@/lib/api";
import type { PlayerCard } from "@/lib/player-card";

export default function Home() {
  const router = useRouter();
  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);

  useEffect(() => {
    apiGet<{ player_card: PlayerCard }>("/api/player-card")
      .then((data) => setPlayerCard(data.player_card))
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) {
          router.replace("/player-card/new");
          return;
        }
        router.replace("/login");
      });
  }, [router]);

  if (!playerCard) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-muted">
      プレイヤーカードは作成済みです。スワイプ画面は準備中です。
    </div>
  );
}
