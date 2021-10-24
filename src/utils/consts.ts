export const DEX_COUNT = [400, 211, 210]; // SWSH, IoA, CT
export const DEX_CODE = ['swsh', 'ioa', 'ct'];
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

export enum DexId {
  Unspecified = -1,
  Swsh = 27,
  Ioa = 28,
  Ct = 29,
};

export const DEX_CODE_TO_ID = {
  [DEX_CODE[0]]: DexId.Swsh,
  [DEX_CODE[1]]: DexId.Ioa,
  [DEX_CODE[2]]: DexId.Ct,
  '': DexId.Unspecified,
};

export type Pm = {
  name: {name: string}[];
  dex: {pokedex_id: DexId; pokedex_number: number}[];
  id: number;
};

export const SPRITE_BASE_URL='https://storage.googleapis.com/swshpolydex/sprites/';