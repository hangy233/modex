import { SPRITE_BASE_URL, VERSION } from "./consts";

export const versionToGen = (version: VERSION): number => {
  let gen = 1;
  if (version >= VERSION.gold) {
    gen++;
  }
  if (version >= VERSION.ruby) {
    gen++;
  }
  if (version >= VERSION.diamond) {
    gen++;
  }
  if (version >= VERSION.black) {
    gen++;
  }
  if (version >= VERSION.x) {
    gen++;
  }
  if (version >= VERSION.sun) {
    gen++;
  }
  if (version >= VERSION.sword) {
    gen++;
  }
  return gen;
};

const VERSION_KEYS: string[] = Object.keys(VERSION).filter((k) => typeof VERSION[k as any] === 'number');
const VERSION_VALUES: VERSION[] = Array(VERSION_KEYS.length).fill(0).map((v, i) => i+1);

export const getVersionsFromSameGen = (version: VERSION): VERSION[] => {
  const gen = versionToGen(version);
  return VERSION_VALUES.filter((v) => versionToGen(v) === gen);
};

const versionToSpriteVersion = (version: VERSION): string => {
  switch (version) {
    case VERSION.red:
    case VERSION.blue:
      return 'red-blue';
    case VERSION.yellow:
      return 'yellow';
    case VERSION.gold:
      return 'gold';
    case VERSION.silver:
      return 'silver';
    case VERSION.crystal:
      return 'crystal';
    case VERSION.ruby:
    case VERSION.sapphire:
      return 'ruby-sapphire';
    case VERSION.firered:
    case VERSION.leafgreen:
      return 'firered-leafgreen';
    case VERSION.emerald:
      return 'emerald';
  }

  return '';
};

// export const arrSum = (arr: Array<any>) => arr.reduce((a,b) => a + b, 0);
// export const getCanonicalName = (name: string) => name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
// export const getSpriteUrl = (nid: number) => `${SPRITE_BASE_URL}regular/${nid}.png`;
//https://storage.googleapis.com/retrodex/sprites/gen1/main-sprites/red-blue/1.png
export const getSpriteUrl = ({version, nationalId}: {version: VERSION, nationalId: number}): string => {
  return `${SPRITE_BASE_URL}gen${versionToGen(version)}/main-sprites/${versionToSpriteVersion(version)}/${nationalId}.png`;
};

export const debounce = (func: Function, wait: number = 200): Function => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
};

// TODO: i13n.
export const versionToName = (version: VERSION): string => {
  switch (version) {
    case VERSION.red:
      return 'red';
    case VERSION.blue:
      return 'blue';
    case VERSION.yellow:
      return 'yellow';
    case VERSION.gold:
      return 'gold';
    case VERSION.silver:
      return 'silver';
    case VERSION.crystal:
      return 'crystal';
  }

  return '';
};
