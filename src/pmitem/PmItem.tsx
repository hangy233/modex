import React from 'react';
import { getSpriteUrl } from '../utils';
import './PmItem.css';

export type PmItemProps = {
  name: string;
  nid: number;
  id: number;
};

const PmItem = ({name, id, nid}: PmItemProps): JSX.Element => {
  return (
  <div
    className="pm-item"
    data-dex-id={id}
    data-national-id={nid}
    style={{backgroundImage: `url(${getSpriteUrl(nid)})`}}
    >
    <span>{name}</span>
    {/* <img src={getSpriteUrl(nid)} /> */}
  </div>);
}

export default PmItem;
