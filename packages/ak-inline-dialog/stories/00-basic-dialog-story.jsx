import { storiesOf } from '@kadira/storybook';
import React from 'react';

import InlineDialog from '../src';
import { name } from '../package.json';

const centeredContainerStyles = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const targetStyles = {
  background: 'green',
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
          open
        >
          <div style={targetStyles}>I am the target</div>
        </InlineDialog>
      </div>);
  }, { overrides: codeExampleOverrrides })
  .addCodeExampleStory('Basic dialog story2', () => {
    const dialogContent = <div>This is some inline dialog content!</div>;

    return (
      <div style={centeredContainerStyles}>
        <InlineDialog
          content={dialogContent}
          position="left middle"
          open
        >
          <div style={targetStyles}>I am the target</div>
        </InlineDialog>
      </div>);
  }, { overrides: codeExampleOverrrides });
