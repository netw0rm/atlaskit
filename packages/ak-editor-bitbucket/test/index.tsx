import chai from 'chai';
import { chaiPlugin } from 'ak-editor-test';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { doc, strong, h1, p } from './_schema-builder';

import Editor from '../src/index';

chai.use(chaiPlugin);
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

describe('ak-editor-bitbucket/setFromHtml', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = mount(<Editor defaultExpanded />).get(0);
  });

  it('should accept empty strings', () => {
    editor.setFromHtml('');
    expect(editor.doc).to.deep.equal(doc(p()));

    editor.setFromHtml('     \t \n  \r  \n');
    expect(editor.doc).to.deep.equal(doc(p()));
  });

  it('should accept simple markup', () => {
    editor.setFromHtml('<h1>foo</h1>');
    expect(editor.doc).to.deep.equal(doc(h1('foo')));

    editor.setFromHtml('<p>foo <strong>bar</strong></p>');
    expect(editor.doc).to.deep.equal(doc(p('foo ', strong('bar'))));
  });
});
