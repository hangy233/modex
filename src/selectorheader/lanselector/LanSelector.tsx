import { Link, useSearchParams } from 'react-router-dom';
import { getVersionsFromSameGen, versionToName } from '../../utils';
import { LAN, LAN_NAMES, LAN_NAME_TO_ID, VERSION } from '../../utils/consts';
import { useParams } from "react-router";

type LanSelectorProps = {
  onChange: (lan: LAN) => void,
};

const LanSelector = ({onChange}: LanSelectorProps): JSX.Element => {
  const selectLan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lan = event.target?.value;
    if (!lan || !LAN_NAME_TO_ID[lan]) return;
    onChange(LAN_NAME_TO_ID[lan]);
  };

  return (
    <select onChange={selectLan}>
      {LAN_NAMES.map((lanName) => (
        <option value={lanName}>{lanName}</option>
      ))}
    </select>
  );
}

export default LanSelector;
