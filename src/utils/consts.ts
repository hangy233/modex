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
  'placeholder',
  'ja',
  'zh-Hans',
};

export enum STRING_NAMESPACE {
  'ui',
  'pokemonName',
  'pokemonDescription',
};

//TODO: add language type
export const LANGUAGES = [
  {
    code: 'ja-Hrkt',
    name: 'にほんご',
    id: LAN['ja-Hrkt'],
  },
  {
    code: 'ko',
    name: '한국어',
    id: LAN.ko,
  },
  {
    code: 'zh-Hant',
    name: '繁體中文',
    id: LAN['zh-Hant'],
  },
  {
    code: 'fr',
    name: 'Français',
    id: LAN.fr,
  },
  {
    code: 'de',
    name: 'Deutsch',
    id: LAN.de,
  },
  {
    code: 'es',
    name: 'Español',
    id: LAN.es,
  },
  {
    code: 'it',
    name: 'Italiano',
    id: LAN.it,
  },
  {
    code: 'en',
    name: 'English',
    id: LAN.en,
  },
  {
    code: 'ja',
    name: '日本語',
    id: LAN.ja,
  },
  {
    code: 'zh-Hans',
    name: '简体中文',
    id: LAN['zh-Hans'],
  },
];

export const LAN_NAMES = LANGUAGES.map((l) => l.name);

export enum VERSION {
  'red',
  'green',
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
