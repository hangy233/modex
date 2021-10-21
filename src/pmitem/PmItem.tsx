import React from 'react';
import { getSpriteUrl } from '../utils';
import './PmItem.css';

export type PmItemProps = {
  name?: string;
  nid: number;
  id: number;
};

const PmItem = ({name = '', id, nid}: PmItemProps): JSX.Element => {
  return (
  <div
    className="pm-item"
    data-dex-id={id}
    data-national-id={nid}
    style={name ? {backgroundImage: `url(${getSpriteUrl(nid)})`} : undefined}
    >
    <span>{name}</span>
  </div>);
}

export const PmPlaceholder = ({id, nid}: PmItemProps): JSX.Element => {
  return <PmItem id={id} nid={nid} />;
}

export default PmItem;
