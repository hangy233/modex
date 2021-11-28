export enum LAN {
  'ja-Hrkt' = 1,
  'roomaji',
  'ko',
  'zh-Hant',
  'fr',
  'de',
  'es',
  'it',
  'en',
  'ja',
  'zh-Hans',
};

export const LAN_NAME_TO_ID: {
  [key: string]: LAN,
 } = {
  'English': LAN.en,
  'Español': LAN.es,
  'Français': LAN.fr,
  'Deutsch': LAN.de,
  'Italiano': LAN.it,
  'にほんご': LAN['ja-Hrkt'],
  '日本語': LAN.ja,
  '한국어': LAN.ko,
  '简体中文': LAN['zh-Hans'],
  '繁體中文': LAN['zh-Hant'],
};

export const LAN_NAMES = Object.keys(LAN_NAME_TO_ID);

export enum VERSION {
  'red' = 1,
  'blue',
  'yellow',
  'gold',
  'silver',
  'crystal',
  'ruby',
  'sapphire',
  'emerald',
  'firered',
  'leafgreen',
  'diamond',
  'pearl',
  'platinum',
  'heartgold',
  'soulsilver',
  'black',
  'white',
  'colosseum',
  'xd',
  'black-2',
  'white-2',
  'x',
  'y',
  'omega-ruby',
  'alpha-sapphire',
  'sun',
  'moon',
  'ultra-sun',
  'ultra-moon',
  'lets-go-pikachu',
  'lets-go-eevee',
  'sword',
  'shield',
};

export const SPRITE_BASE_URL: string = 'https://storage.googleapis.com/retrodex/sprites/';
