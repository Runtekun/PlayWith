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
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_6px_0_#e8dcc8]">
        <div className="relative h-28 bg-gradient-to-br from-primary to-secondary">
          <div className="absolute -bottom-8 left-8 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white bg-secondary text-2xl font-bold text-white">
            {playerCard.user?.name?.charAt(0) ?? "?"}
          </div>
        </div>

        <div className="px-8 pt-10">
          <p className="text-lg font-bold text-foreground">
            {playerCard.user?.name ?? "プレイヤー"}
          </p>
          {playerCard.bio && (
            <p className="mt-1.5 text-sm text-muted">{playerCard.bio}</p>
          )}
        </div>

        <div className="px-8 pb-8 pt-4">
          <div className="mb-1 text-xs font-bold text-muted-light">
            登録ゲーム
          </div>
          {playerCard.player_card_games.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col gap-2 border-t border-black/5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-foreground">
                  {entry.game.name}
                </span>
                {entry.rank && (
                  <span className="rounded-full bg-background px-3 py-1 text-xs font-bold text-foreground">
                    {entry.rank.name}
                  </span>
                )}
                <span className="rounded-full bg-background px-3 py-1 text-xs font-bold text-foreground">
                  {entry.play_style}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                <span>{entry.play_time_slot}</span>
                {entry.voice_chat && (
                  <span className="flex items-center gap-0.5">
                    <Mic size={12} strokeWidth={2.5} />
                    ボイスOK
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
