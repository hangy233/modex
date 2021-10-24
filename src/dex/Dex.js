import React, { useEffect, useMemo, useState } from 'react';
import Loader from '../loader/Loader';
import { DexId, DEX_CODE_TO_ID } from '../utils/consts';
import { filterPms } from '../utils';
import DexSwitcher from '../dexswitcher/DexSwitcher';
import RecycledGrid from '../recycledgrid/RecycledGrid';
import PmItem, {PmPlaceholder} from '../pmitem/PmItem';
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { fetchGen8 } from '../fetcher';

function PmGrid({pmList}) {
  const { dexCode } = useParams();
  const dexId = DEX_CODE_TO_ID[dexCode];
  const list = useMemo(() => filterPms(pmList, dexId), [pmList, dexId]);
  return <RecycledGrid list={list} ItemComponent={PmItem} PlaceholderComponent={PmPlaceholder} itemWidth={104} itemHeight={116} keyField="nid" />
};

function Dex() {
  const [gen8, setGen8] = useState([]);

  useEffect(() => {
    fetchGen8()
    .then((res) => {
      setGen8(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const navigate = useNavigate();
  const setDexId = ([dexId: DexId, dexCode]) => {
    navigate(dexCode);
  }

  return (
    <>
    <DexSwitcher onSwitch={setDexId} />
    <Loader fallback="Loading..." value={gen8}>
      <Routes>
        <Route path="/" element={<PmGrid pmList={gen8} />} />
        <Route path="/:dexCode" element={<PmGrid pmList={gen8} />} />
      </Routes>
    </Loader>
    </>
  );
}

export default Dex;
