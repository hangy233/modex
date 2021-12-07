import { createContext, useState, ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPokemonNames, fetchUiTexts } from "../fetcher";
import { LAN, LANGUAGES, STRING_NAMESPACE, VERSION } from "../utils/consts";

const FALLBACK = '...';

enum STATE {
  notFetched,
  fetching,
  fetched,
};

type FetchState = {
  [key: number]: {
    [key: number]: STATE,
  },
};

export const LocaleContext = createContext<{switchLan: (lan:LAN) => void, strings: {[key: string]: string}, currentLan: LAN}>({
  switchLan: (lan: LAN) => {},
  strings: {},
  currentLan: LAN.en,
});

const LocaleProvider = ({children}: {children: ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [strings, setStrings] = useState<{[key: number]: {[key: string]: string}}>({});
  const [lan, setLan] = useState<LAN>(LAN.en);
  const [fetchState, setFetchStateInternal] = useState<FetchState>({});
  const nextLanRef = useRef<LAN|null>(null);

  const getLanFromParam = (): LAN => {
    const lanParam = searchParams.get('lan') || 'en';
    let lan = parseInt(lanParam, 10);
    if (Number.isNaN(lan)) {
      lan = LANGUAGES.find((l) => l.code === lanParam)?.id || LAN.en;
    }
    return lan;
  };

  const getFetchState = ({nameSpace, lan}: {nameSpace: STRING_NAMESPACE, lan: LAN}) => {
    if (!fetchState[lan]) return STATE.notFetched;
    if (!fetchState[lan][nameSpace]) return STATE.notFetched;
    return fetchState[lan][nameSpace];
  }

  const setFetchState = ({nameSpace, lan, state}: {nameSpace: STRING_NAMESPACE, lan: LAN, state: STATE}) => {
    setFetchStateInternal((prevState) => {
      return {
        ...prevState,
        [lan]: {
          ...prevState[lan],
          [nameSpace]: state,
        }
      };
    });
  }

  // TODO: ability to force fetch?
  const fetchLan = ({nameSpaces, lan}: {nameSpaces: STRING_NAMESPACE[], lan: LAN}): boolean => {
    let needFetch = false;
    for (const nameSpace of nameSpaces) {
      if (strings[lan] && strings[nameSpace]) continue;
      if (getFetchState({nameSpace, lan}) !== STATE.notFetched) continue;

      setFetchState({nameSpace, lan, state: STATE.fetching});
      needFetch = true;
    }

    return needFetch;
  };

  useEffect(() => {
    (async function() {
      for (const lanStr of Object.keys(fetchState)) {
        const lan = parseInt(lanStr, 10);
        for (const [nameSpaceStr, state] of Object.entries(fetchState[lan])) {
          const nameSpace = parseInt(nameSpaceStr, 10);
          if (state !== STATE.fetching) continue;
          let newStrings = {};
          switch(nameSpace) {
            case STRING_NAMESPACE.ui:
              newStrings = await fetchUiTexts(lan);
              break;
            case STRING_NAMESPACE.pokemonName:
              newStrings = await fetchPokemonNames({lan});
              break;
          }

          setStrings((prevStrings) =>  ({
            ...prevStrings,
            [lan]: {
              ...prevStrings[lan],
              ...newStrings,
            }
          }));
          setFetchState({nameSpace, lan, state: STATE.fetched});
        }
      }
    })();

    if (nextLanRef.current && isLanFetched(nextLanRef.current)) {
      setLan(nextLanRef.current);
      nextLanRef.current = null;
    }
  }, [fetchState]);

  const isLanFetched = (lan: LAN) => {
    for (const state of Object.values(fetchState[lan] || {})) {
      if (state !== STATE.fetched) return false;
    }
    return true;
  }

  // TODO: Use different nameSpaces bease on path.
  const switchLan = (lan: LAN) => {
    const needFetch = fetchLan({lan, nameSpaces: [STRING_NAMESPACE.ui, STRING_NAMESPACE.pokemonName]});
    if (needFetch) {
      nextLanRef.current = lan;
    } else {
      setLan(lan);
    }
  };

  const contextValue = {
    switchLan,
    strings: strings[lan] || {},
    currentLan: lan,
  };

  useEffect(() => {
    switchLan(LAN.en);
  }, []);

  return <LocaleContext.Provider value={contextValue}>
    {children}
    </LocaleContext.Provider>;
};

export default LocaleProvider;
