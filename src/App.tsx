import React, { useEffect, useState } from 'react';
import { fetchGen8 } from './fetcher';
import logo from './logo.svg';
import './App.css';
import Loader from './loader/Loader';
import { Dex } from './utils/consts';
import { filterPms } from './utils';
import DexSwitcher from './dexswitcher/DexSwitcher';
import RecycledGrid from './recycledgrid/RecycledGrid';
import PmItem, {PmPlaceholder} from './pmitem/PmItem';

function App() {
  const [gen8, setGen8] = useState([]);
  const [dexId, setDexId] = useState(Dex.Unspecified);

  useEffect(() => {
    fetchGen8()
    .then((res) => {
      setGen8(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const filteredPmList = filterPms(gen8, dexId);

  return (
    <div className="App">
      <DexSwitcher onSwitch={setDexId} />
      <Loader fallback="Loading..." value={gen8}>
        <RecycledGrid list={filteredPmList} ItemComponent={PmItem} PlaceholderComponent={PmPlaceholder} itemWidth={104} itemHeight={116} keyField="nid" />
      </Loader>
    </div>
  );
}

export default App;
