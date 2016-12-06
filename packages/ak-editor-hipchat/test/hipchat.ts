import React from 'react';
import Editor from '../src';
import mocha from 'mocha';
import chai from 'chai';

const { expect } = chai;

describe('ak-editor-hipchat', () => {
  it('can be created', () => {
    const editor = React.createElement(Editor);
  });
});
