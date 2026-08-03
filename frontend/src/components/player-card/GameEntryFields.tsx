"use client";

import { X } from "lucide-react";
import { GAMES, PLAY_STYLES, PLAY_TIME_SLOTS, RANKS_BY_GAME } from "@/lib/game-options";

export type GameEntryValue = {
  game: string;
  rank: string;
  playStyle: string;
  playTimeSlot: string;
  voiceChat: boolean;
};

type GameEntryFieldsProps = {
  index: number;
  value: GameEntryValue;
  onChange: (value: GameEntryValue) => void;
  onRemove: () => void;
  removable: boolean;
};

const selectClassName =
  "w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary";

export function GameEntryFields({
  index,
  value,
  onChange,
  onRemove,
  removable,
}: GameEntryFieldsProps) {
  const ranks = RANKS_BY_GAME[value.game] ?? [];

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
          value={value.game}
          onChange={(e) =>
            onChange({ ...value, game: e.target.value, rank: "" })
          }
          className={selectClassName}
        >
          {GAMES.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>

        <select
          value={value.rank}
          onChange={(e) => onChange({ ...value, rank: e.target.value })}
          disabled={ranks.length === 0}
          className={selectClassName}
        >
          <option value="">
            {ranks.length === 0 ? "ランクなし" : "選択してください"}
          </option>
          {ranks.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
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
