import React from 'react';
import { Link } from 'react-router-dom';
import { getSpriteUrl } from '../utils';
import './PmItem.css';

export type PmItemProps = {
  name?: string;
  nid: number;
  id: number;
};

const PmItem = ({name = '', id, nid}: PmItemProps): JSX.Element => {
  return (
    <Link to={`/poke/${nid}`}>
      <div
        className="pm-item"
        data-dex-id={id}
        data-national-id={nid}
        style={name ? {backgroundImage: `url(${getSpriteUrl(nid)})`} : undefined}
        >
        <span>{name}</span>
      </div>
    </Link>);
}

export const PmPlaceholder = ({id, nid}: PmItemProps): JSX.Element => {
  return <PmItem id={id} nid={nid} />;
}

export default PmItem;
