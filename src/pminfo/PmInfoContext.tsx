import { createContext, useState, ReactNode, memo, useContext } from "react";
import { FetcherContext } from "../fetcher/FetcherContext";
import { fetchPokemonInfo } from "../fetcher/utils";

type PmInfo = {
  height: number,
  weight: number,
  hasGenderDifferences: boolean,
};

type PmInfoContextType = {
  getInfo: (nationalId: number) => PmInfo,
  cacheInfo: ({nationalId, pmInfo}: {nationalId: number, pmInfo: PmInfo}) => void,
  fetchInfo: (nationalId: number) => Promise<PmInfo>,
};

const DEFAULT_PM_INFO = {
  height: -1,
  weight: -1,
  hasGenderDifferences: false,
};

export const PmInfoContext = createContext<PmInfoContextType>({
  getInfo: () => DEFAULT_PM_INFO,
  cacheInfo: () => {},
  fetchInfo: () => Promise.resolve(DEFAULT_PM_INFO),
});

const PmInfoProvider = ({children}: {children: ReactNode}) => {
  const [pmInfos, setPmInfos] = useState<{[key: number]: PmInfo}>({});
  const {fetch} = useContext(FetcherContext);

  const cacheInfo = ({nationalId, pmInfo}: {nationalId: number, pmInfo: PmInfo}) => {
    setPmInfos({
      ...pmInfos,
      [nationalId]: pmInfo, 
    });
  };

  const getInfo = (nationalId: number): PmInfo => {
    if (pmInfos[nationalId]) {
      return pmInfos[nationalId];
    }

    return DEFAULT_PM_INFO;
  };

  const fetchInfo = async (nationalId: number): Promise<PmInfo> => {
    const pmInfo = await fetch({
      hash: `info_${nationalId}`,
      request: () => fetchPokemonInfo({nationalId}),
    });
    cacheInfo({nationalId, pmInfo});
    return pmInfo;
  }

  const contextValue = {
    getInfo,
    fetchInfo,
    cacheInfo,
  };

  return <PmInfoContext.Provider value={contextValue}>
    {children}
    </PmInfoContext.Provider>;
};

export default memo(PmInfoProvider);
