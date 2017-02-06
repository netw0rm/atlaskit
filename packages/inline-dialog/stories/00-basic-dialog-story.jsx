import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { akColorG300 } from '@atlaskit/util-shared-styles';

import InlineDialog from '../src';
import { name } from '../package.json';

const centeredContainerStyles = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const targetStyles = {
  background: akColorG300,
  padding: '10px',
};

const codeExampleOverrrides = { style: '...' };

storiesOf(name, module)
  .addCodeExampleStory('Basic dialog story', () => {
    const dialogContent = <div>This is some inline dialog content!</div>;

    return (
      <div style={centeredContainerStyles}>
        <InlineDialog
          content={dialogContent}
          isOpen
        >
          <div style={targetStyles}>I am the target</div>
        </InlineDialog>
      </div>);
  }, { overrides: codeExampleOverrrides })
  .addCodeExampleStory('Dialog with flipping enabled', () => {
    const dialogContent = <div>This is some inline dialog content!</div>;

    return (
      <div style={centeredContainerStyles}>
        <InlineDialog
          content={dialogContent}
          position="left middle"
          isOpen
          shouldFlip
        >
          <div style={targetStyles}>I am the target</div>
        </InlineDialog>
      </div>);
  }, { overrides: codeExampleOverrrides });
