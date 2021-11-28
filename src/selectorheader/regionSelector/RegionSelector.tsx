import { Link, useSearchParams } from "react-router-dom";
import { VERSION } from "../../utils/consts";

type ReionSelectorProps = {
  version: VERSION,
  onChange: (version: VERSION) => void,
};

const RegionSelector = ({version, onChange}:ReionSelectorProps): JSX.Element => {
  

  return (
    <>
      <div onClick={() => onChange(VERSION.red)}>Kanto</div>
      <div onClick={() => onChange(VERSION.gold)}>Johto</div>
    </>
  )
}

export default RegionSelector;
