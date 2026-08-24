"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiGet } from "@/lib/api";
import type { PlayerCard } from "@/lib/player-card";
import {
  PlayerCardForm,
  type PlayerCardFormInitialValues,
} from "@/components/player-card/PlayerCardForm";

export default function EditPlayerCardPage() {
  const router = useRouter();
  const [initialValues, setInitialValues] =
    useState<PlayerCardFormInitialValues | null>(null);

  useEffect(() => {
    apiGet<{ player_card: PlayerCard }>("/api/player-card")
      .then((data) => {
        setInitialValues({
          bio: data.player_card.bio ?? "",
          entries: data.player_card.player_card_games.map((entry) => ({
            gameId: entry.game_id,
            rankId: entry.rank_id,
            playStyle: entry.play_style,
            playTimeSlot: entry.play_time_slot,
            voiceChat: entry.voice_chat,
          })),
        });
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) {
          router.replace("/player-card/new");
          return;
        }
        router.replace("/login");
      });
  }, [router]);

  if (!initialValues) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-6">
      <PlayerCardForm mode="edit" initialValues={initialValues} />
    </div>
  );
}
