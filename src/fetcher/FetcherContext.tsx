import { createContext, useState, ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPokemonNames, fetchUiTexts } from "../fetcher/utils";
import { LAN, LANGUAGES, STRING_NAMESPACE, VERSION } from "../utils/consts";

export enum STATE {
  notFetched,
  fetching,
  fetched,
};

type FetchState = {
  [key: string]:  STATE,
};

type FetcherContextType = {
  fetch: <T>({hash, request}: {hash: string, request: () => Promise<T>}) => Promise<T>,
  getState: (hash: string) => STATE,
};

const CANCELLATION_ERROR = new Error('Fetch cancelled.');

export const FetcherContext = createContext<FetcherContextType>({
  fetch: () => Promise.reject(CANCELLATION_ERROR),
  getState: () => STATE.fetched,
});

const FetcherProvider = ({children}: {children: ReactNode}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchState, setFetchState] = useState<FetchState>({});

  // TODO: ability to force fetch?
  const fetch = async function<T>({hash, request}: {hash: string, request: () => Promise<T>}): Promise<T> {
    if (fetchState[hash] && fetchState[hash] !== STATE.notFetched) {
      return Promise.reject(CANCELLATION_ERROR);
    }

    setFetchState((prevState) => ({
      ...prevState,
      [hash]: STATE.fetching,
    }));
    
    const res = await request();
    
    setFetchState((prevState) => ({
      ...prevState,
      [hash]: STATE.fetched,
    }));

    return res;
  };

  const getState = (hash: string) => fetchState[hash] === undefined ? STATE.notFetched : fetchState[hash];

  const contextValue = {
    fetch,
    getState,
  };

  return <FetcherContext.Provider value={contextValue}>
    {children}
    </FetcherContext.Provider>;
};

export default FetcherProvider;
