import type { Game, Rank } from "@/lib/games";

export type PlayerCardGame = {
  id: number;
  player_card_id: number;
  game_id: number;
  rank_id: number | null;
  play_style: string;
  play_time_slot: string;
  voice_chat: boolean;
  game: Game;
  rank: Rank | null;
};

export type PlayerCardUser = {
  id: number;
  name: string;
};

export type PlayerCard = {
  id: number;
  user_id: number;
  bio: string | null;
  player_card_games: PlayerCardGame[];
  user?: PlayerCardUser;
};
