import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { LinkWithQuery } from '../linkwithquery/LinkWithQuery';
import { getSpriteUrl } from '../utils';
import { VERSION } from '../utils/consts';
import './PmItem.css';

export type PmItemProps = {
  name?: string;
  nationalId: number;
};

const PmItem = ({name = '', nationalId}: PmItemProps): JSX.Element => {
  let [searchParams, setSearchParams] = useSearchParams();
  const versionParam = searchParams.get('version');
  const version = versionParam ? parseInt(versionParam, 10) : VERSION.red;

  return (
    <LinkWithQuery to={`p/${nationalId}`}>
      <div
        className="pm-item"
        data-version-id={version}
        data-national-id={nationalId}
        style={name ? {backgroundImage: `url(${getSpriteUrl({version ,nationalId})})`} : undefined}
        >
        <span>{name}</span>
      </div>
    </LinkWithQuery>);
};

export const PmPlaceholder = ({nationalId}: PmItemProps): JSX.Element => {
  return <PmItem nationalId={nationalId} />;
};

export default PmItem;
