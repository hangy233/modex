import React, { useContext, useEffect, useMemo, useState } from 'react';
import Loader from '../loader/Loader';
import { DexId, DEX_CODE_TO_ID, VERSION } from '../utils/consts';
import { filterPms } from '../utils';
import VersionSelector from '../selectorheader/versionselector/VersionSelector';
import RecycledGrid from '../recycledgrid/RecycledGrid';
import PmItem, {PmPlaceholder} from '../pmitem/PmItem';
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { fetchGen1Name } from '../fetcher/utils';
import { LocaleContext } from '../i18n/LocaleContext';

function PmGrid({pmList}) {
  return <RecycledGrid list={pmList} ItemComponent={PmItem} PlaceholderComponent={PmPlaceholder} itemWidth={104} itemHeight={116} keyField="nationalId" />
};

function Dex() {
  const {strings} = useContext(LocaleContext);
  const pms = Array(151).fill(1).map((n, i) => ({
    nationalId: i+1,
    name: strings[i+1],
  }));
  
  return (
    <>
    <Loader fallback="Loading..." value={strings[1]}>
      <PmGrid pmList={pms} />
    </Loader>
    </>
  );
}

export default Dex;
