import { createContext, useState, ReactNode, useEffect, useRef, useContext } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { FetcherContext } from "../fetcher/FetcherContext";
import { fetchPokemonDescription, fetchPokemonNames, fetchUiTexts } from "../fetcher/utils";
import { LAN, LANGUAGES, STRING_NAMESPACE, VERSION } from "../utils/consts";

const FALLBACK = '...';

type Strings = {[key: string]: string};
type StringsState = {[key: number]: Strings};

type LanNameSpacePair = {nameSpace: STRING_NAMESPACE, lan: LAN};

type LocaleContextType = {
  switchLan: (lan:LAN) => void,
  fetchStrings: (lanNameSpacePairs: LanNameSpacePair[]) => Promise<void>,
  cacheString: ({string, lan, key}: {string: string, lan: LAN, key: string}) => void,
  strings: Strings,
  currentLan: LAN,
};

export const LocaleContext = createContext<LocaleContextType>({
  switchLan: (lan: LAN) => {},
  fetchStrings: (lanNameSpacePairs: LanNameSpacePair[]) => Promise.resolve(),
  cacheString: ({string, lan, key}: {string: string, lan: LAN, key: string}) => {},
  strings: {},
  currentLan: LAN.en,
});

const LocaleProvider = ({children}: {children: ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [strings, setStrings] = useState<StringsState>({});
  const {fetch} = useContext(FetcherContext);
  const versionStr = searchParams.get('version');
  const version = versionStr ? parseInt(versionStr, 10) : VERSION.red;
  const { pathname } = useLocation();
  const nationalIdParam = pathname.split('/p/')[1];
  const nationalId = nationalIdParam ? parseInt(nationalIdParam,10) : 1;

  const getLanFromParam = (): LAN => {
    const lanParam = searchParams.get('lan') || 'en';
    let lan = parseInt(lanParam, 10);
    if (Number.isNaN(lan)) {
      lan = LANGUAGES.find((l) => l.code === lanParam)?.id || LAN.en;
    }
    return lan;
  };

  const setLanParam = (lan: LAN) => {
    searchParams.set('lan', lan.toString(10));
    setSearchParams(searchParams);
  }

  const [lan, setLan] = useState<LAN>(getLanFromParam());

  const maybeFetchStrings = async (lanNameSpacePairs:{nameSpace: STRING_NAMESPACE, lan: LAN}[]) => {
    const promises = lanNameSpacePairs.map((lanNameSpacePair) => fetch<Strings>({
        hash: `${lanNameSpacePair.lan}_${lanNameSpacePair.nameSpace}`,
        request: () => fetchStrings(lanNameSpacePair),
      })
    );

    const results = await Promise.allSettled(promises);

    setStrings((prevState) =>  {
      const newState: StringsState = {};
      for (let i = 0; i < lanNameSpacePairs.length; i++) {
        if (results[i].status !== 'fulfilled') continue;
        const {lan} = lanNameSpacePairs[i];
        if (!newState[lan]) {
          newState[lan] = {...prevState[lan]};
        }
        // @ts-ignore
        Object.assign(newState[lan], results[i].value);
      }
      return {
        ...prevState,
        ...newState,
      }
    });
  };

  const fetchStrings = async ({lan, nameSpace}: LanNameSpacePair): Promise<Strings> => {
    switch(nameSpace) {
      case STRING_NAMESPACE.ui:
        return await fetchUiTexts(lan);
      case STRING_NAMESPACE.pokemonName:
        return await fetchPokemonNames({lan});
      case STRING_NAMESPACE.pokemonDescription:
        return await fetchPokemonDescription({lan, version, nationalId});
    }
  };

  const fetchInitialStringsForPath = async (lan: LAN = getLanFromParam()) => {
    const nameSpaces = [STRING_NAMESPACE.ui];
    if (pathname === '/') {
      nameSpaces.push(STRING_NAMESPACE.pokemonName);
    } else {
      nameSpaces.push(STRING_NAMESPACE.pokemonDescription);
    }
    return await maybeFetchStrings(nameSpaces.map((nameSpace) => ({lan, nameSpace})));
  };

  // TODO: Use different nameSpaces bease on path.
  const switchLan = (lan: LAN) => {
    fetchInitialStringsForPath(lan).then(() => setLan(lan));
    setLanParam(lan);
  };

  const cacheString = ({string, lan, key}: {string: string, lan: LAN, key: string}) => {
    setStrings((prevState) =>  {
      return {
        ...prevState,
        [lan]: {
          ...prevState[lan],
          [key]: string,
        },
      }
    });
  };

  const contextValue = {
    switchLan,
    fetchStrings: maybeFetchStrings,
    cacheString,
    strings: strings[lan] || {},
    currentLan: lan,
  };

  useEffect(() => {
    fetchInitialStringsForPath();
  }, []);

  return <LocaleContext.Provider value={contextValue}>
    {children}
    </LocaleContext.Provider>;
};

export default LocaleProvider;
