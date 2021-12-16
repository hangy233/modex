import { Link, useSearchParams } from 'react-router-dom';
import { getVersionsFromSameGen, versionToName } from '../utils';
import { LAN, VERSION } from '../utils/consts';
import { useParams } from "react-router";
import RegionSelector from './regionSelector/RegionSelector';
import VersionSelector from './versionselector/VersionSelector';
import LanSelector from './lanselector/LanSelector';

const SelectorHeader = (): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams();
  const versionParam = searchParams.get('version');
  const version = versionParam ? parseInt(versionParam, 10) : VERSION.red;

  const setVersionParam = (version: VERSION) => {
    searchParams.set('version', version.toString(10));
    setSearchParams(searchParams);
  };

  return (
    <div>
      <RegionSelector version={version} onChange={setVersionParam}/>
      <VersionSelector version={version} onChange={setVersionParam} />
      <LanSelector />
    </div>
  );
}

export default SelectorHeader;
