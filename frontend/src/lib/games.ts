import { apiGet } from "@/lib/api";

export type Rank = {
  id: number;
  game_id: number;
  name: string;
  sort_order: number;
};

export type Game = {
  id: number;
  name: string;
  ranks: Rank[];
};

export async function fetchGames(): Promise<Game[]> {
  const data = await apiGet<{ games: Game[] }>("/api/games");
  return data.games;
}
