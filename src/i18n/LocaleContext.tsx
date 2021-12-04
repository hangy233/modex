import { createContext, useState, ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchI18nTexts } from "../fetcher";
import { LAN, LANGUAGES, VERSION } from "../utils/consts";

const FALLBACK = '...';

export const LocaleContext = createContext<{switchLan: (lan:LAN) => void, strings: {[key: string]: string}, currentLan: LAN}>({
  switchLan: (lan: LAN) => {},
  strings: {},
  currentLan: LAN.en,
});

const LocaleProvider = ({children}: {children: ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [strings, setStrings] = useState<{[key: string]: {[key: string]: string}}>({});
  const [lan, setLan] = useState<LAN>(LAN.en);
  const fetching = new Set();

  const getLanFromParam = (): LAN => {
    const lanParam = searchParams.get('lan') || 'en';
    let lan = parseInt(lanParam, 10);
    if (Number.isNaN(lan)) {
      lan = LANGUAGES.find((l) => l.code === lanParam)?.id || LAN.en;
    }
    return lan;
  };

  const fetchLan = async (lan: LAN) => {
    if (strings[lan]) {
      setLan(lan);
      return;
    }
    if (fetching.has(lan)) return;

    fetching.add(lan);
    const newStrings = await fetchI18nTexts(lan);
    setStrings((prevStrings) =>  ({...prevStrings, [lan]: newStrings}));
    fetching.delete(lan);
    setLan(lan);
  };

  const switchLan = (lan: LAN) => {
    fetchLan(lan);
  };

  const contextValue = {
    switchLan,
    strings: strings[lan],
    currentLan: lan,
  };

  useEffect(() => {
    fetchLan(LAN.en);
  }, []);

  return <LocaleContext.Provider value={contextValue}>
    {children}
    </LocaleContext.Provider>;
};

export default LocaleProvider;
