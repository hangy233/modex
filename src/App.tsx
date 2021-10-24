import './App.css';
import { Routes, Route } from "react-router-dom";
import Dex from './dex/Dex';
import PmView from './pmview/PmView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Dex />} />
        <Route path="/poke/:nid" element={<PmView />} />
      </Routes>
    </div>
  );
}

export default App;
