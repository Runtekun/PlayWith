<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class RankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ranksByGame = [
            'APEX Legends' => [
                'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'マスター', 'プレデター',
            ],
            'VALORANT' => [
                'アイアン', 'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'アセンダント', 'イモータル', 'レディアント',
            ],
            'Overwatch 2' => [
                'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'マスター', 'グランドマスター', 'チャンピオン',
            ],
            'Counter-Strike 2' => [
                'シルバー', 'ゴールドノヴァ', 'マスターガーディアン', 'ディスティングイッシュトマスターガーディアン',
                'レジェンダリーイーグル', 'レジェンダリーイーグルマスター', 'サプリームマスターファーストクラス', 'グローバルエリート',
            ],
            'PUBG: BATTLEGROUNDS' => [
                'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'マスター',
            ],
            'レインボーシックス シージ' => [
                'カッパー', 'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'エメラルド', 'ダイヤモンド', 'チャンピオン',
            ],
        ];

        foreach ($ranksByGame as $gameName => $ranks) {
            $game = Game::where('name', $gameName)->first();

            if (! $game) {
                continue;
            }

            foreach ($ranks as $index => $rankName) {
                $game->ranks()->firstOrCreate([
                    'name' => $rankName,
                ], [
                    'sort_order' => $index + 1,
                ]);
            }
        }
    }
}
