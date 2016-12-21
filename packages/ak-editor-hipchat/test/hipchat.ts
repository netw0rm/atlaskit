import * as React from 'react';
import Editor from '../src';
import * as mocha from 'mocha';
import * as chai from 'chai';

const { expect } = chai;

describe('ak-editor-hipchat', () => {
  it('can be created', () => {
    const editor = React.createElement(Editor);
  });
});
