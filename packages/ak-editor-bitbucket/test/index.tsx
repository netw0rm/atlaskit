import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { SinonSpy } from 'sinon';
import * as sinonChai from 'sinon-chai';
import { doc, h1, mention, p, strong } from './_schema-builder';

import { ProseMirror } from 'ak-editor-core';
import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures } from 'ak-editor-core/test-helper';
import ImageIcon from 'ak-icon/glyph/editor/image';
import Editor from '../src/index';

chai.use(chaiPlugin);
chai.use(((chaiEnzyme as any).default || chaiEnzyme)());
chai.use((sinonChai as any).default || sinonChai);

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

  it('should expand after clicking', () => {
    const editorWrapper = mount(<Editor />);

    editorWrapper.find('ChromeCollapsed input').simulate('focus');

    expect(editorWrapper.find('ChromeCollapsed')).not.to.exist;
    expect(editorWrapper.find('ChromeExpanded')).to.exist;
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

  it('should call onExpanded after editor is expanded via click', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy}/>);

    editorWrapper.find('ChromeCollapsed input').simulate('focus');
    expect(spy).to.have.been.calledOnce;
  });

  it('should call onExpanded after editor is expanded via .expand()', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy}/>);
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(spy).to.have.been.calledOnce;
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
    // Note: Mobile Safari and OSX Safari 9 do not bubble CustomEvent of type 'drop'
    //       so we must dispatch the event directly on the event which has listener attached.
    const dropElement: HTMLElement = (editor.get(0) as any).state.pm.content.parentNode;
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

    dropElement.dispatchEvent(event);

    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWith(event);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });
});

describe('ak-editor-bitbucket/multiple editors as children', () => {
  const fixture = fixtures();
  type Props = {};
  type State = {};
  class ContainerWithTwoEditors extends React.PureComponent<Props, State> {
    render() {
     return (
       <div>
         <Editor isExpandedByDefault />
         <Editor isExpandedByDefault />
       </div>
     );
    }
  }

  let container: ReactWrapper<Props, State>;
  let editor1: ReactWrapper<Props, State>;
  let editor2: ReactWrapper<Props, State>;

  beforeEach(() => {
    container = mount(<ContainerWithTwoEditors />, { attachTo: fixture() });
    editor1 = container.find(Editor).at(0);
    editor2 = container.find(Editor).at(1);
  });

  it('should render two editors inside a common container', () => {
    expect(container.find(Editor)).to.exist;
    expect(editor1.is(Editor)).to.be.true;
    expect(editor2.is(Editor)).to.be.true;
  });

  it('should render toolbar elements for both editors', () => {
    expect(editor1.find('ChromeExpanded ToolbarBlockType')).to.exist;
    expect(editor1.find('ChromeExpanded ToolbarTextFormatting')).to.exist;
    expect(editor1.find('ChromeExpanded ToolbarLists')).to.exist;

    expect(editor2.find('ChromeExpanded ToolbarBlockType')).to.exist;
    expect(editor2.find('ChromeExpanded ToolbarTextFormatting')).to.exist;
    expect(editor2.find('ChromeExpanded ToolbarLists')).to.exist;
  });
});

describe('ak-editor-bitbucket/toolbar', () => {
  let editor: ReactWrapper<any, any>;

  beforeEach(() => {
    editor = mount(<Editor isExpandedByDefault />);
  });

  it('should close blocktype dropdown after second click', () => {
    const trigger = editor.find('ToolbarBlockType AkButton');

    expect(trigger).to.exist;
    expect(editor.find('ToolbarBlockType Group')).to.not.exist;

    trigger.simulate('click');
    expect(editor.find('ToolbarBlockType Group')).to.exist;

    trigger.simulate('click');
    expect(editor.find('ToolbarBlockType Group')).to.not.exist;
  });
});

describe('ak-editor-bitbucket/pasting', () => {
  const fixture = fixtures();
  let editor: Editor;
  let pm: ProseMirror;

  beforeEach(() => {
    editor = mount(<Editor isExpandedByDefault />, { attachTo: fixture() }).get(0) as any;
    pm = editor!.state!.pm as ProseMirror;
  });

  it('should transform pasted html with an emoji', function() {
    const content = {
      html: '<p>Nice! <img src="https://d301sr.cloudfront.net/69284d5bf158/emoji/img/%2B1.svg" class="emoji"></p>'
    };

    if(!dispatchPasteEvent(pm, content)) {
      return this.skip('This environment does not support artificial paste events');
    }

    expect(editor.doc).to.deep.equal(doc(p('Nice! :+1:')));
  });

  it('should transform pasted html with a mention', function() {
    const content = {
      html: '<p><a href="/mention/" rel="nofollow" title="@mention" class="mention">Mention</a> some mention.</p>'
    };

    if(!dispatchPasteEvent(pm, content)) {
      return this.skip('This environment does not support artificial paste events');
    }

    expect(editor.doc).to.deep.equal(doc(p(mention({ id: 'mention', displayName: '@Mention' }), ' some mention.')));
  });
});
