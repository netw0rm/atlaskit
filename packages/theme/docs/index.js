import React from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: ${colors.codeBlock};
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      Theme is a combined component and utility set, exporting a main component
      for use and as well as a number of helper methods to allow easy application of
      atlaskit{"'"}s themes.
    </p>
    <Usage>{
      "import { AtlasKitThemeProvider, themed, colors } from '@atlaskit/theme';"
    }</Usage>
    <h3>The theme provider</h3>
    <p>
      Theme provider is a wrapper component that accepts a {"'mode'"}. This mode is
      passed down to styled components below it, using the styled components library
      theme provider, while also providing some defaults.
    </p>
    <p>
      Native AtlasKit components are set up to have both a {"'light'"} mode and
      a {"'dark'"} mode, and will respond to this, defaulting to the {"'light'"}
      mode if no theme is provided.
    </p>
    <p>
      The AtlasKitThemeProvider should wrap your entire app, to ensure all components
      are set to the same theme. Mixing dark and light moded components will severely
      impact accessibility.
    </p>
    <h3>themed function</h3>
    <p>
      The themed export is a function that generates functions which
      switch on mode. These generated functions can be passed to a styled component
      to make a property responsive to mode. AtlasKit components will do this by default.
    </p>
    <h3>colors object</h3>
    <p>
      The colors object is an export that has the ADG colors attached to it, for
      easy use.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
];
