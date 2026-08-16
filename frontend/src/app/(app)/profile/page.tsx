"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";
import { ApiError, apiGet } from "@/lib/api";
import type { PlayerCard } from "@/lib/player-card";

export default function ProfilePage() {
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
    <div className="flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-4 shadow-[0_6px_0_#e8dcc8]">
        <h1 className="mb-3 text-center text-base font-bold text-foreground">
          マイページ
        </h1>

        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-xl font-bold text-white">
            {playerCard.user?.name?.charAt(0) ?? "?"}
          </div>
        </div>

        <p className="mb-1 text-center text-sm font-bold text-foreground">
          {playerCard.user?.name ?? "プレイヤー"}
        </p>

        {playerCard.bio && (
          <p className="mb-4 text-center text-sm text-muted">
            {playerCard.bio}
          </p>
        )}

        <div className="mb-1 text-xs font-bold text-muted">登録ゲーム</div>
        {playerCard.player_card_games.map((entry) => (
          <div key={entry.id} className="mb-3 rounded-2xl bg-background p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">
                {entry.game.name}
              </span>
              {entry.voice_chat && (
                <Mic size={16} strokeWidth={2} className="text-secondary" />
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entry.rank && (
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-foreground">
                  {entry.rank.name}
                </span>
              )}
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-foreground">
                {entry.play_style}
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-foreground">
                {entry.play_time_slot}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
