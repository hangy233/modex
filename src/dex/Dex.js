import React, { useEffect, useMemo, useState } from 'react';
import Loader from '../loader/Loader';
import { DexId, DEX_CODE_TO_ID, VERSION } from '../utils/consts';
import { filterPms } from '../utils';
import VersionSelector from '../selectorheader/versionselector/VersionSelector';
import RecycledGrid from '../recycledgrid/RecycledGrid';
import PmItem, {PmPlaceholder} from '../pmitem/PmItem';
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { fetchGen1 } from '../fetcher';

function PmGrid({pmList}) {
  return <RecycledGrid list={pmList} ItemComponent={PmItem} PlaceholderComponent={PmPlaceholder} itemWidth={104} itemHeight={116} keyField="nid" />
};

function Dex() {
  const [gen1, setGen1] = useState([]);

  useEffect(() => {
    fetchGen1()
    .then((res) => {
      setGen1(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);


  return (
    <>
    <Loader fallback="Loading..." value={gen1}>
      <PmGrid pmList={gen1} />
    </Loader>
    </>
  );
}

export default Dex;
