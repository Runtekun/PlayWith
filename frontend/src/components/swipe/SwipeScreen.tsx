"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import { SwipeCard } from "./SwipeCard";
import type { PlayerCard } from "@/lib/player-card";

// TODO: バックエンドにスワイプ候補取得APIができ次第、fetchしたデータに置き換える
const MOCK_CANDIDATES: PlayerCard[] = [
  {
    id: 1,
    user_id: 101,
    bio: "APEXでプラチナ目指してます!よろしくお願いします。",
    user: { id: 101, name: "ゆうき" },
    player_card_games: [
      {
        id: 1,
        player_card_id: 1,
        game_id: 2,
        rank_id: 3,
        play_style: "エンジョイ勢",
        play_time_slot: "平日夜",
        voice_chat: true,
        game: { id: 2, name: "APEX Legends", ranks: [] },
        rank: { id: 3, game_id: 2, name: "ゴールド", sort_order: 3 },
      },
    ],
  },
  {
    id: 2,
    user_id: 102,
    bio: "VALORANTまったり勢です。初心者さん歓迎!",
    user: { id: 102, name: "みさき" },
    player_card_games: [
      {
        id: 2,
        player_card_id: 2,
        game_id: 3,
        rank_id: null,
        play_style: "まったり勢",
        play_time_slot: "週末昼",
        voice_chat: false,
        game: { id: 3, name: "VALORANT", ranks: [] },
        rank: null,
      },
    ],
  },
];

export function SwipeScreen() {
  const [index, setIndex] = useState(0);
  const currentCard = MOCK_CANDIDATES[index];

  function handleAction() {
    // TODO: POST /api/swipe-actions に接続する
    setIndex((prev) => prev + 1);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6">
      {currentCard ? (
        <>
          <SwipeCard playerCard={currentCard} />
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleAction}
              aria-label="スキップ"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-muted-light shadow-[0_4px_0_#e5e5e5]"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={handleAction}
              aria-label="一緒にプレイ"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_0_var(--primary-shadow)]"
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
