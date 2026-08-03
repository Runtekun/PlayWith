// TODO: バックエンドにゲーム一覧取得APIができ次第、fetchしたデータに置き換える

export const GAMES = [
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
] as const;

export const RANKS_BY_GAME: Record<string, string[]> = {
  'APEX Legends': ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'マスター', 'プレデター'],
  VALORANT: ['アイアン', 'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'アセンダント', 'イモータル', 'レディアント'],
  'Overwatch 2': ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'マスター', 'グランドマスター', 'チャンピオン'],
  'Counter-Strike 2': [
    'シルバー', 'ゴールドノヴァ', 'マスターガーディアン', 'ディスティングイッシュトマスターガーディアン',
    'レジェンダリーイーグル', 'レジェンダリーイーグルマスター', 'サプリームマスターファーストクラス', 'グローバルエリート',
  ],
  'PUBG: BATTLEGROUNDS': ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤモンド', 'マスター'],
  'レインボーシックス シージ': ['カッパー', 'ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'エメラルド', 'ダイヤモンド', 'チャンピオン'],
};

export const PLAY_STYLES = ['ガチ勢', 'エンジョイ勢', 'まったり勢'];

export const PLAY_TIME_SLOTS = ['平日昼', '平日夜', '週末昼', '週末夜', '深夜'];
