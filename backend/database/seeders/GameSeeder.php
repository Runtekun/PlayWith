<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $games = [
            'Minecraft',
            'APEX Legends',
            'VALORANT',
            'Overwatch 2',
            'Counter-Strike 2',
            'PUBG: BATTLEGROUNDS',
            'Dead by Daylight',
            'Civilization VI',
            'Civilization VII',
            'Fortnite',
            'Valheim',
            'Among Us',
            'Rust',
            'Grand Theft Auto V',
            'Palworld',
            'Helldivers 2',
            'Phasmophobia',
            'ARK: Survival Ascended',
            'Europa Universalis IV',
            'Europa Universalis V',
            'Hearts of Iron IV',
            'FINAL FANTASY XIV',
            'レインボーシックス シージ',
            'モンスターハンターワイルズ',
            'ドラゴンクエストX',
            '黒い砂漠',
            '原神',
        ];

        foreach ($games as $name) {
            Game::firstOrCreate(['name' => $name]);
        }
    }
}
