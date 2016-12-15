import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, ReactWrapper } from 'enzyme';
import { default as sinon, SinonSpy } from 'sinon';
import React from 'react';
import { doc, strong, h1, p } from './_schema-builder';
import { browser } from 'ak-editor-prosemirror';

import Editor from '../src/index';
import ImageIcon from 'ak-icon/glyph/editor/image';
import { chaiPlugin, createEvent } from 'ak-editor-test';

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

describe('ak-editor-bitbucket/imageUploadHandler', () => {
  let editor: ReactWrapper<any, any>;
  let spy: SinonSpy;

  beforeEach(() => {
    spy = sinon.spy();
    editor = mount(<Editor isExpandedByDefault imageUploadHandler={spy} />);
  });

  it('should invoke upload handler after clicking image icon', () => {
    editor
      .find('ChromeExpanded')
      .find(ImageIcon)
      .parent()
      .simulate('click');
    
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith(undefined);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });

  it('should invoke upload handler after pasting an image', function() {
    const contentArea: HTMLElement = (editor.get(0) as any).state.pm.content;
    const event = createEvent('paste');
    
    try {
      Object.defineProperties(event, {
        clipboardData: {
          value: {
            types: ['Files']
          }
        }
      });
    } catch (e) {
      return this.skip('This environment does not allow mocking paste events - ' + e);
    }
    
    contentArea.dispatchEvent(event);

    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith(event);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });

  it('should invoke upload handler after dropping an image', function(){
    if (browser.ios) {
      // Even though Safari supports "drop" DOM event, it doesn't propagate correctly 
      // causing this test to fail: http://go.atlassian.com/ios-drag-drop
      return this.skip(`iOS doesn't support drag an drop events.`);
    }

    const contentArea: HTMLElement = (editor.get(0) as any).state.pm.content;
    const event = createEvent('drop');
    
    Object.defineProperties(event, {
      dataTransfer: {
        value: {
          getData: (type: string) => '',
          setData: () => {},
          clearData: () => {},
          types: ['Files'],
          files: [],
          items: [],
        }
      }
    });
    
    contentArea.dispatchEvent(event);
    
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith(event);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });
});
