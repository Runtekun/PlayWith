"use client";

import { useState } from "react";
import { GAMES } from "@/lib/game-options";
import { GameEntryFields, type GameEntryValue } from "./GameEntryFields";

function createEmptyEntry(): GameEntryValue {
  return {
    game: GAMES[0],
    rank: "",
    playStyle: "",
    playTimeSlot: "",
    voiceChat: false,
  };
}

export function PlayerCardForm() {
  const [bio, setBio] = useState("");
  const [entries, setEntries] = useState<GameEntryValue[]>([
    createEmptyEntry(),
  ]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: プレイヤーカード作成APIに接続する
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-3xl bg-white p-4 shadow-[0_6px_0_#e8dcc8]"
    >
      <h1 className="mb-3 text-center text-base font-bold text-foreground">
        プレイヤーカードを作成
      </h1>

      <label htmlFor="bio" className="text-xs font-bold text-muted">
        自己紹介
      </label>
      <textarea
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
        placeholder="よろしくお願いします!"
        className="mb-4 mt-1 w-full resize-none rounded-xl border border-black/10 px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
      />

      {entries.map((entry, index) => (
        <GameEntryFields
          key={index}
          index={index}
          value={entry}
          removable={entries.length > 1}
          onChange={(next) =>
            setEntries((prev) =>
              prev.map((e, i) => (i === index ? next : e)),
            )
          }
          onRemove={() =>
            setEntries((prev) => prev.filter((_, i) => i !== index))
          }
        />
      ))}

      <button
        type="button"
        onClick={() =>
          setEntries((prev) => [...prev, createEmptyEntry()])
        }
        className="w-full rounded-xl border-[1.5px] border-dashed border-secondary py-2 text-xs font-bold text-secondary"
      >
        + ゲームを追加
      </button>

      <button
        type="submit"
        className="mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_3px_0_var(--primary-shadow)]"
      >
        保存する
      </button>
    </form>
  );
}
