"use client";

import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import { SwipeCard } from "./SwipeCard";
import { FlashMessage } from "@/components/ui/FlashMessage";
import { fetchSwipeCandidates, submitSwipeAction } from "@/lib/swipe";
import type { PlayerCard } from "@/lib/player-card";

export function SwipeScreen() {
  const [candidates, setCandidates] = useState<PlayerCard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSwipeCandidates().then(setCandidates);
  }, []);

  const currentCard = candidates?.[index];

  async function handleAction(action: "like" | "skip") {
    if (!currentCard || isSubmitting) return;
    setIsSubmitting(true);
    setMatchMessage(null);

    try {
      const result = await submitSwipeAction(currentCard.user_id, action);
      if (result.match) {
        setMatchMessage(
          `${currentCard.user?.name ?? "相手"}さんとマッチしました!`,
        );
      }
      setIndex((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (candidates === null) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6">
      {matchMessage && (
        <FlashMessage type="success" message={matchMessage} />
      )}

      {currentCard ? (
        <>
          <SwipeCard playerCard={currentCard} />
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleAction("skip")}
              disabled={isSubmitting}
              aria-label="スキップ"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-muted-light shadow-[0_4px_0_#e5e5e5] disabled:opacity-60"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => handleAction("like")}
              disabled={isSubmitting}
              aria-label="一緒にプレイ"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_0_var(--primary-shadow)] disabled:opacity-60"
            >
              <Heart size={24} strokeWidth={2.5} />
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">
          今表示できる相手がいません。また後で確認してください。
        </p>
      )}
    </div>
  );
}
