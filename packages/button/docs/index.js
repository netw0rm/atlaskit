import React from 'react';
import styled from 'styled-components';
import { akBorderRadius, akColorN20, akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

/* eslint-disable import/no-duplicates, import/first */
import ButtonAppearances from './ButtonAppearances';
import buttonAppearancesSrc from '!raw-loader!./ButtonAppearances';
import ButtonOptions from './ButtonOptions';
import buttonOptionsSrc from '!raw-loader!./ButtonOptions';
import ButtonSelect from './ButtonSelect';
import buttonSelectSrc from '!raw-loader!./ButtonSelect';
import ButtonDark from './ButtonDark';
import buttonDarkSrc from '!raw-loader!./ButtonDark';
/* eslint-enable import/no-duplicates, import/first */

const Pre = styled.pre`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  font-family: Monaco, Menlo, monospace;
  font-size: 0.9em;
  margin: ${akGridSizeUnitless * 2}px 0;
  overflow-x: auto;
  padding: ${akGridSize};
`;

export const description = (
  <div>
    <p>
      Buttons are used as triggers for actions. They are used in forms,
      toolbars, dialog footers and as stand-alone action triggers.
    </p>
    <Pre>
      {"import Button, { ButtonGroup } from '@atlaskit/button';"}
    </Pre>
    <p>
      If you want to use multiple buttons in a row, you can ButtonGroup component
      to wrap the Buttons.
    </p>
    <p>
      Button groups allow you to group buttons and manage
      them as a block. This ensures the buttons are given correct spacing (with
      RTL support).
    </p>
  </div>
);

export const examples = [
  {
    title: 'Appearance Options',
    Component: ButtonAppearances,
    src: buttonAppearancesSrc,
  },
  {
    title: 'Dark Themed Buttons',
    Component: ButtonDark,
    src: buttonDarkSrc,
  },
  {
    title: 'Selectable button',
    Component: ButtonSelect,
    src: buttonSelectSrc,
  },
  {
    title: 'Other Options',
    Component: ButtonOptions,
    src: buttonOptionsSrc,
  },
];
