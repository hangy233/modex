import { Link, useSearchParams } from 'react-router-dom';
import { getVersionsFromSameGen, versionToName } from '../../utils';
import { VERSION } from '../../utils/consts';
import { useParams } from "react-router";
import { useContext } from 'react';
import { LocaleContext } from '../../i18n/LocaleContext';

type VersionSelectorProps = {
  version: VERSION,
  onChange: (version: VERSION) => void,
};

const VersionSelector = ({version, onChange}: VersionSelectorProps): JSX.Element => {
  const {strings} = useContext(LocaleContext);
  const versions = getVersionsFromSameGen(version);
  const selectVersion = (version: VERSION) => {
    onChange(version);
  };

  return (
    <div>
      {versions.map((version => (
        <span onClick={() => selectVersion(version)}>{strings ? strings[versionToName(version)] : ''}</span>
      )))}
    </div>
  );
}

export default VersionSelector;
