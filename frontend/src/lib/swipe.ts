import { apiGet, apiPost } from "@/lib/api";
import type { PlayerCard } from "@/lib/player-card";

export type MatchRecord = {
  id: number;
  created_at: string;
};

export type SwipeActionResult = {
  swipe_action: {
    id: number;
    from_user_id: number;
    to_user_id: number;
    action: "like" | "skip";
  };
  match: MatchRecord | null;
};

export async function fetchSwipeCandidates(): Promise<PlayerCard[]> {
  const data = await apiGet<{ player_cards: PlayerCard[] }>(
    "/api/swipe-candidates",
  );
  return data.player_cards;
}

export async function submitSwipeAction(
  toUserId: number,
  action: "like" | "skip",
): Promise<SwipeActionResult> {
  return apiPost<SwipeActionResult>("/api/swipe-actions", {
    to_user_id: toUserId,
    action,
  });
}
