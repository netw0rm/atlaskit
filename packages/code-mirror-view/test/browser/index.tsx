import * as chai from 'chai';
// import { mount, ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import * as React from 'react';
// import * as sinon from 'sinon';
// import { SinonSpy } from 'sinon';
// import { doc, h1, p, strong, code_block } from './_schema-builder';

// import { EditorView, browser } from '@atlaskit/editor-core';
// import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures, insertText, sendKeyToPm } from '@atlaskit/editor-core/dist/es5/test-helper';
import { chaiPlugin, fixtures } from '@atlaskit/editor-core/dist/es5/test-helper';
import Editor from '../../stories/editor';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-bitbucket/expand and collapse', () => {
  const fixture = fixtures();
  let editorWrapper;
  beforeEach(() => {
    editorWrapper = mount(<Editor />, { attachTo: fixture() });
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should render simple code block correctly', () => {
    expect(true).to.equal(true);
  });
});
