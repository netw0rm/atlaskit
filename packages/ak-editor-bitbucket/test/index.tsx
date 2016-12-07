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
    expect(mount(<Editor />).find('ChromeCollapsed')).to.exist;
    expect(mount(<Editor />).find('input[placeholder]')).to.exist;
    expect(mount(<Editor />).find('ChromeExpanded')).not.to.exist;
  });

  it('should respect defaultExpanded property', () => {
    expect(mount(<Editor isExpandedByDefault />).find('ChromeCollapsed')).not.to.exist;
    expect(mount(<Editor isExpandedByDefault />).find('ChromeExpanded')).to.exist;
  });

  it('.expand() method should expand the editor chrome', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(editorWrapper.find('ChromeCollapsed')).not.to.exist;
    expect(editorWrapper.find('ChromeExpanded')).to.exist;
  });

  it('.collapse() method should collapse the editor chrome', () => {
    const editorWrapper = mount(<Editor isExpandedByDefault />);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.collapse();

    expect(editorWrapper.find('ChromeCollapsed')).to.exist;
    expect(editorWrapper.find('ChromeExpanded')).not.to.exist;
  });
});

describe('ak-editor-bitbucket/setFromHtml', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = mount(<Editor isExpandedByDefault />).get(0) as any;
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
