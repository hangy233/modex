import { Link, useSearchParams } from 'react-router-dom';
import { getVersionsFromSameGen, versionToName } from '../../utils';
import { LAN, LANGUAGES, LAN_NAMES, VERSION } from '../../utils/consts';
import { useParams } from "react-router";
import { useContext } from 'react';
import { LocaleContext } from '../../i18n/LocaleContext';

type LanSelectorProps = {
  onChange: (lan: LAN) => void,
};

const LanSelector = ({onChange}: LanSelectorProps): JSX.Element => {
  const {currentLan, switchLan} = useContext(LocaleContext);
  const selectLan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lanString = event.target?.value;
    if (!lanString) return;
    const lan = parseInt(lanString,10);

    onChange(lan);
    switchLan(lan);
  };

  return (
    <select onChange={selectLan}>
      {LANGUAGES.map(({name, id}) => (
        <option value={id} selected={currentLan === id}>{name}</option>
      ))}
    </select>
  );
}

export default LanSelector;
