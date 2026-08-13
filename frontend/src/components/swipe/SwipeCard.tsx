import { Mic } from "lucide-react";
import type { PlayerCard } from "@/lib/player-card";

type SwipeCardProps = {
  playerCard: PlayerCard;
};

export function SwipeCard({ playerCard }: SwipeCardProps) {
  const primaryGame = playerCard.player_card_games[0];

  return (
    <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-3xl bg-white shadow-[0_6px_0_#e8dcc8]">
      <div className="h-56 bg-gradient-to-br from-primary to-secondary" />

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-base font-bold text-foreground">
            {playerCard.user?.name ?? "プレイヤー"}
          </span>
          {primaryGame?.voice_chat && (
            <Mic size={16} strokeWidth={2} className="text-secondary" />
          )}
        </div>

        {primaryGame && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
              {primaryGame.game.name}
            </span>
            {primaryGame.rank && (
              <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
                {primaryGame.rank.name}
              </span>
            )}
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
              {primaryGame.play_style}
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-bold text-foreground">
              {primaryGame.play_time_slot}
            </span>
          </div>
        )}

        {playerCard.bio && (
          <p className="text-sm text-muted">{playerCard.bio}</p>
        )}
      </div>
    </div>
  );
}
