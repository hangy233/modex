import { DEX_COUNT, DexId, Pm, SPRITE_BASE_URL } from "./consts";

const arrSum = (arr: Array<any>) => arr.reduce((a,b) => a + b, 0);

export const filterPms = (pms: Array<Pm>, dexId: DexId = DexId.Unspecified) => {
  const filtered = dexId === DexId.Unspecified ? pms : pms
    .filter((pm: Pm) => pm.dex.some(({pokedex_id}) => pokedex_id === dexId));

  return filtered
      .map((pm: Pm) => {
        const dex = pm.dex.find(({pokedex_id}) => pokedex_id === dexId) || pm.dex[0];
        const idIncrease = dexId === DexId.Unspecified ? arrSum(DEX_COUNT.slice(0, dex.pokedex_id - DexId.Swsh)) : 0;

        return {
          name: pm.name[0].name,
          nid: pm.id,
          id: dex.pokedex_number + idIncrease,
        }
      })
      .sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
};

export const getCanonicalName = (name: string) => name.replaceAll('.', '').replaceAll(' ', '-').toLowerCase();
export const getSpriteUrl = (nid: number) => `${SPRITE_BASE_URL}regular/${nid}.png`;

export const debounce = (func: Function, wait = 200) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
};
