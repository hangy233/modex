import './App.css';
import { Routes, Route, Outlet, useParams } from "react-router-dom";
import Dex from './dex/Dex';
import PmView from './pmview/PmView';
import { VERSION } from './utils/consts';
import SelectorHeader from './selectorheader/SelectorHeader';
import LocaleProvider from './i18n/LocaleContext';
import PmInfoProvider from './pminfo/PmInfoContext';
import FetcherProvider from './fetcher/FetcherContext';

const Root = () => {
  return <>
    <SelectorHeader />
    <Outlet />
  </>;
};

function App() {
  return (
    <div className="App">
      <FetcherProvider>
      <LocaleProvider>
      <PmInfoProvider>
        <Routes>
          <Route path="/" element={<Root />} >
            <Route path="/" element={<Dex />} />
            <Route path="/p/:nationalId" element={<PmView />} />
          </Route>
        </Routes>
      </PmInfoProvider>
      </LocaleProvider>
      </FetcherProvider>
    </div>
  );
}

export default App;
