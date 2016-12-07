import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';

import Editor from '../src/index';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const expect = chai.expect;

describe('ak-editor-bitbucket/expand and collapse', () => {
  it('should not render expanded chrome when collapsed by default', () => {
    expect(shallow(<Editor />).find('ChromeCollapsed')).to.be.defined;
    expect(shallow(<Editor />).find('input[placeholder]')).to.be.defined;
    expect(shallow(<Editor />).find('ChromeExpanded')).to.not.be.defined;
  });

  it('should respect defaultExpanded property', () => {
    expect(shallow(<Editor isExpandedByDefault />).find('ChromeCollapsed')).to.not.be.defined;
    expect(shallow(<Editor isExpandedByDefault />).find('ChromeExpanded')).to.be.defined;
  });

  it('.expand() method should expand the editor chrome', () => {
    const editorWrapper = mount(<Editor />);
    const editor = editorWrapper.get(0);

    editor.expand();

    expect(editorWrapper.find('ChromeCollapsed')).to.not.be.defined;
    expect(editorWrapper.find('ChromeExpanded')).to.be.defined;
  });

  it('.collapse() method should collapse the editor chrome', () => {
    const editorWrapper = mount(<Editor isExpandedByDefault />);
    const editor = editorWrapper.get(0);

    editor.collapse();

    expect(editorWrapper.find('ChromeCollapsed')).to.be.defined;
    expect(editorWrapper.find('ChromeExpanded')).to.not.be.defined;
  });
});
