import React from 'react';
import { Dex } from '../utils/consts';

type DexSwitcherProps = {
  onSwitch: Function;
};
const DexSwitcher = ({onSwitch}: DexSwitcherProps): JSX.Element => {
  return (
    <div>
      <button onClick={() => onSwitch(Dex.Unspecified)}>All Sword and Shield Pokémons</button>
      <button onClick={() => onSwitch(Dex.Swsh)}>Galar Pokédex</button>
      <button onClick={() => onSwitch(Dex.Ioa)}>Isle of Armor Pokédex</button>
      <button onClick={() => onSwitch(Dex.Ct)}>The Crown Tundra Pokédex</button>
      <button>Other Available Pokémon</button>
    </div>
  );
}

export default DexSwitcher;
