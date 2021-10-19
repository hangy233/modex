export const DEX_COUNT = [400, 211, 210]; // SWSH, IoA, CT

export const LAN_ID: {
  [key: string]: number;
} = {
  'ja-Hrkt': 1,
  'roomaji': 2,
  'ko': 3,
  'zh-Hant': 4,
  'fr': 5,
  'de': 6,
  'es': 7,
  'it': 8,
  'en': 9,
  'ja': 11,
  'zh-Hans': 12,
};

export enum Dex {
  Unspecified = -1,
  Swsh = 27,
  Ioa = 28,
  Ct = 29,
}

export type Pm = {
  name: {name: string}[];
  dex: {pokedex_id: Dex; pokedex_number: number}[];
  id: number;
};

export const SPRITE_BASE_URL='https://storage.googleapis.com/swshpolydex/sprites/';