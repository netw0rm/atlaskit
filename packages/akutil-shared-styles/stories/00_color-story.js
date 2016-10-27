import React from 'react';
import { storiesOf } from '@kadira/storybook';

import * as colors from '../src';
import { name } from '../package.json';
import Ring from './color/Ring';

const {
  akColorPrimary1,
  akColorPrimary2,
  akColorPrimary3,
  akColorPrimary4,

  akColorSecondary1,
  akColorSecondary2,
  akColorSecondary3,
  akColorSecondary4,
} = colors;


function getColorsBySwatch(swatchLetter) {
  const swatchRgx = new RegExp(`^akColor${swatchLetter.toUpperCase()}`);
  const ret = {};
  Object
    .keys(colors)
    .filter(key => swatchRgx.test(key))
    .forEach((key) => {
      ret[key.replace(swatchRgx, swatchLetter)] = colors[key];
    });
  return ret;
}

storiesOf(name, module)
  .add('Colors: Primary', () => (
    <div>
      <h1>Primary colors</h1>
      <Ring
        topLeftColor={akColorPrimary1}
        topRightColor={akColorPrimary2}
        bottomLeftColor={akColorPrimary3}
        bottomRightColor={akColorPrimary4}
      />
    </div>
  ))
  .add('Colors: Secondary', () => (
    <div>
      <h1>Secondary colors</h1>
      <Ring
        topLeftColor={akColorSecondary1}
        topRightColor={akColorSecondary2}
        bottomLeftColor={akColorSecondary3}
        bottomRightColor={akColorSecondary4}
      />
    </div>
  ))
  .add('Colors: Neutrals', () => (
    <table>
      <tbody>
        {Object.entries(getColorsBySwatch('N')).map(([colorName, colorValue]) => (
          <tr style={{ backgroundColor: colorValue }}>
            <td>{colorName}</td>
            <td>{colorValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ));
