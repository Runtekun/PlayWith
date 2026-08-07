"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { fetchGames, type Game } from "@/lib/games";
import { setFlash } from "@/lib/flash";
import { FlashMessage } from "@/components/ui/FlashMessage";
import { GameEntryFields, type GameEntryValue } from "./GameEntryFields";

function createEmptyEntry(games: Game[]): GameEntryValue {
  return {
    gameId: games[0]?.id ?? 0,
    rankId: null,
    playStyle: "",
    playTimeSlot: "",
    voiceChat: false,
  };
}

export function PlayerCardForm() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [bio, setBio] = useState("");
  const [entries, setEntries] = useState<GameEntryValue[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchGames()
      .then((fetchedGames) => {
        setGames(fetchedGames);
        setEntries([createEmptyEntry(fetchedGames)]);
      })
      .finally(() => setIsLoadingGames(false));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await apiPost("/api/player-card", {
        bio,
        games: entries.map((entry) => ({
          game_id: entry.gameId,
          rank_id: entry.rankId,
          play_style: entry.playStyle,
          play_time_slot: entry.playTimeSlot,
          voice_chat: entry.voiceChat,
        })),
      });

      setFlash("success", "プレイヤーカードを作成しました");
      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "予期しないエラーが発生しました",
      );
      setIsSubmitting(false);
    }
  }

  if (isLoadingGames) {
    return (
      <div className="w-full max-w-sm rounded-3xl bg-white p-4 text-center text-sm text-muted shadow-[0_6px_0_#e8dcc8]">
        読み込み中...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-3xl bg-white p-4 shadow-[0_6px_0_#e8dcc8]"
    >
      <h1 className="mb-3 text-center text-base font-bold text-foreground">
        プレイヤーカードを作成
      </h1>

      {errorMessage && <FlashMessage type="error" message={errorMessage} />}

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
          games={games}
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
          setEntries((prev) => [...prev, createEmptyEntry(games)])
        }
        className="w-full rounded-xl border-[1.5px] border-dashed border-secondary py-2 text-xs font-bold text-secondary"
      >
        + ゲームを追加
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_3px_0_var(--primary-shadow)] disabled:opacity-60"
      >
        {isSubmitting ? "送信中..." : "保存する"}
      </button>
    </form>
  );
}
