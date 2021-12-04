import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LocaleContext } from "../../i18n/LocaleContext";
import { VERSION } from "../../utils/consts";

type ReionSelectorProps = {
  version: VERSION,
  onChange: (version: VERSION) => void,
};

const RegionSelector = ({version, onChange}:ReionSelectorProps): JSX.Element => {
  
  const {strings} = useContext(LocaleContext);

  return (
    <>
      <div onClick={() => onChange(VERSION.red)}>{strings?.kanto}</div>
      <div onClick={() => onChange(VERSION.gold)}>{strings?.johto}</div>
    </>
  )
}

export default RegionSelector;
