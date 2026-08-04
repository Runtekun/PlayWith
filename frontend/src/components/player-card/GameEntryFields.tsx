"use client";

import { X } from "lucide-react";
import { PLAY_STYLES, PLAY_TIME_SLOTS } from "@/lib/game-options";
import type { Game } from "@/lib/games";

export type GameEntryValue = {
  gameId: number;
  rankId: number | null;
  playStyle: string;
  playTimeSlot: string;
  voiceChat: boolean;
};

type GameEntryFieldsProps = {
  index: number;
  value: GameEntryValue;
  games: Game[];
  onChange: (value: GameEntryValue) => void;
  onRemove: () => void;
  removable: boolean;
};

const selectClassName =
  "w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary";

export function GameEntryFields({
  index,
  value,
  games,
  onChange,
  onRemove,
  removable,
}: GameEntryFieldsProps) {
  const ranks = games.find((g) => g.id === value.gameId)?.ranks ?? [];

  return (
    <div className="relative mb-3 rounded-2xl bg-background p-3">
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="このゲームを削除"
          className="absolute right-2 top-2 text-muted-light"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
      <div className="mb-1.5 text-xs font-bold text-foreground">
        ゲーム {index + 1}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <select
          value={value.gameId}
          onChange={(e) =>
            onChange({
              ...value,
              gameId: Number(e.target.value),
              rankId: null,
            })
          }
          className={selectClassName}
        >
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>

        <select
          value={value.rankId ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              rankId: e.target.value ? Number(e.target.value) : null,
            })
          }
          disabled={ranks.length === 0}
          className={selectClassName}
        >
          <option value="">
            {ranks.length === 0 ? "ランクなし" : "選択してください"}
          </option>
          {ranks.map((rank) => (
            <option key={rank.id} value={rank.id}>
              {rank.name}
            </option>
          ))}
        </select>

        <select
          value={value.playStyle}
          onChange={(e) => onChange({ ...value, playStyle: e.target.value })}
          className={selectClassName}
        >
          <option value="">プレイスタイル</option>
          {PLAY_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        <select
          value={value.playTimeSlot}
          onChange={(e) =>
            onChange({ ...value, playTimeSlot: e.target.value })
          }
          className={selectClassName}
        >
          <option value="">プレイ時間帯</option>
          {PLAY_TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <label className="mt-2 flex items-center gap-1.5 text-xs text-muted">
        <input
          type="checkbox"
          checked={value.voiceChat}
          onChange={(e) => onChange({ ...value, voiceChat: e.target.checked })}
          className="h-3.5 w-3.5 accent-primary"
        />
        ボイスチャット可
      </label>
    </div>
  );
}
