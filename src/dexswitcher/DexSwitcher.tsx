import React from 'react';
import { DexId, DEX_CODE } from '../utils/consts';

type DexSwitcherProps = {
  onSwitch: Function;
};
const DexSwitcher = ({onSwitch}: DexSwitcherProps): JSX.Element => {
  return (
    <div>
      <button onClick={() => onSwitch([DexId.Unspecified, ''])}>All Sword and Shield Pokémons</button>
      <button onClick={() => onSwitch([DexId.Swsh, DEX_CODE[0]])}>Galar Pokédex</button>
      <button onClick={() => onSwitch([DexId.Ioa, DEX_CODE[1]])}>Isle of Armor Pokédex</button>
      <button onClick={() => onSwitch([DexId.Ct, DEX_CODE[2]])}>The Crown Tundra Pokédex</button>
      <button>Other Available Pokémon</button>
    </div>
  );
}

export default DexSwitcher;
