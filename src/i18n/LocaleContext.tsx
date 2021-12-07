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

type StringsState = {[key: number]: {[key: string]: string}};

type LanNameSpacePair = {nameSpace: STRING_NAMESPACE, lan: LAN};

export const LocaleContext = createContext<{switchLan: (lan:LAN) => void, strings: {[key: string]: string}, currentLan: LAN}>({
  switchLan: (lan: LAN) => {},
  strings: {},
  currentLan: LAN.en,
});

const LocaleProvider = ({children}: {children: ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [strings, setStrings] = useState<StringsState>({});
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

  const [lan, setLan] = useState<LAN>(getLanFromParam());

  const getFetchState = ({nameSpace, lan}: LanNameSpacePair) => {
    if (!fetchState[lan]) return STATE.notFetched;
    if (!fetchState[lan][nameSpace]) return STATE.notFetched;
    return fetchState[lan][nameSpace];
  }

  const setFetchState = ({lanNameSpacePairs, state}: {lanNameSpacePairs: LanNameSpacePair[], state: STATE}) => {
    setFetchStateInternal((prevState) => {
      const newState: FetchState = {};
      for (const {lan, nameSpace} of lanNameSpacePairs) {
        if (!newState[lan]) {
          newState[lan] = {...prevState[lan]};
        }
        newState[lan][nameSpace] = state;
      }

      return {
        ...prevState,
        ...newState,
      };
    });
  }

  // TODO: ability to force fetch?
  const startFetching = (lanNameSpacePairs:{nameSpace: STRING_NAMESPACE, lan: LAN}[]): boolean => {
    lanNameSpacePairs = lanNameSpacePairs.filter((LanNameSpacePair) => {
      return getFetchState(LanNameSpacePair) === STATE.notFetched;
    });
    if (lanNameSpacePairs.length === 0) return false;

    setFetchState({lanNameSpacePairs, state: STATE.fetching});

    return true;
  };

  const fetch = async ({lan, nameSpace}: LanNameSpacePair) => {
    switch(nameSpace) {
      case STRING_NAMESPACE.ui:
        return await fetchUiTexts(lan);
      case STRING_NAMESPACE.pokemonName:
        return await fetchPokemonNames({lan});
    }
  };

  const getFetchingLanNameSpacePairs = (): LanNameSpacePair[] => {
    const res = [];
    for (const lanStr of Object.keys(fetchState)) {
      const lan = parseInt(lanStr, 10);
      for (const [nameSpaceStr, state] of Object.entries(fetchState[lan])) {
        if (state !== STATE.fetching) continue;
        const nameSpace = parseInt(nameSpaceStr, 10);
        res.push({lan, nameSpace});
      }
    }

    return res;
  };

  useEffect(() => {
    const fetchingLanNameSpacePairs = getFetchingLanNameSpacePairs();
    if (fetchingLanNameSpacePairs.length) {
      Promise.all(fetchingLanNameSpacePairs.map((f) => fetch(f)))
        .then((res) => {
          setStrings((prevState) =>  {
            const newState: StringsState = {};
            for (let i = 0; i < fetchingLanNameSpacePairs.length; i++) {
              const {lan} = fetchingLanNameSpacePairs[i];
              if (!newState[lan]) {
                newState[lan] = {...prevState[lan]};
              }
              Object.assign(newState[lan], res[i]);
            }
            return {
              ...prevState,
              ...newState,
            }
          });

          setFetchState({lanNameSpacePairs: fetchingLanNameSpacePairs, state: STATE.fetched});
        });
    }

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
    const needFetch = startFetching([{lan, nameSpace: STRING_NAMESPACE.ui}, {lan, nameSpace: STRING_NAMESPACE.pokemonName}]);
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
    switchLan(lan);
  }, []);

  return <LocaleContext.Provider value={contextValue}>
    {children}
    </LocaleContext.Provider>;
};

export default LocaleProvider;
