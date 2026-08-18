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
    <div className="px-4 pb-6">
      <div className="mx-auto max-w-sm overflow-hidden rounded-3xl bg-white shadow-[0_6px_0_#e8dcc8]">
        <div className="relative h-24 bg-gradient-to-br from-primary to-secondary">
          <div className="absolute -bottom-7 left-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-secondary text-xl font-bold text-white">
            {playerCard.user?.name?.charAt(0) ?? "?"}
          </div>
        </div>

        <div className="px-4 pb-4 pt-9">
          <p className="text-sm font-bold text-foreground">
            {playerCard.user?.name ?? "プレイヤー"}
          </p>
          {playerCard.bio && (
            <p className="mt-0.5 text-xs text-muted">{playerCard.bio}</p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-3 max-w-sm">
        <div className="mb-1.5 text-xs font-bold text-muted">登録ゲーム</div>
        {playerCard.player_card_games.map((entry) => (
          <div key={entry.id} className="mb-3 rounded-2xl bg-white p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">
                {entry.game.name}
              </span>
              {entry.voice_chat && (
                <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">
                  <Mic size={11} strokeWidth={2.5} />
                  ボイスOK
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entry.rank && (
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
                  {entry.rank.name}
                </span>
              )}
              <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
                {entry.play_style}
              </span>
              <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
                {entry.play_time_slot}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
