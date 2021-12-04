import './App.css';
import { Routes, Route, Outlet, useParams } from "react-router-dom";
import Dex from './dex/Dex';
import PmView from './pmview/PmView';
import { VERSION } from './utils/consts';
import SelectorHeader from './selectorheader/SelectorHeader';
import LocaleProvider from './i18n/LocaleContext';

const Root = () => {
  return <>
    <SelectorHeader />
    <Outlet />
  </>;
};

function App() {
  return (
    <div className="App">
      <LocaleProvider>
        <Routes>
          <Route path="/" element={<Root />} >
            <Route path="/" element={<Dex />} />
            <Route path="/p/:nationalId" element={<PmView />} />
          </Route>
        </Routes>
      </LocaleProvider>
    </div>
  );
}

export default App;
