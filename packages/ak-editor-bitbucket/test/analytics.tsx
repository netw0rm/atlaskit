import chai from 'chai';
import sinon from 'sinon';
import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures, sendKeyToPm, isMac } from 'ak-editor-test';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { doc, strong, h1, p } from './_schema-builder';

import { ProseMirror } from 'ak-editor-prosemirror';
// import { keyup } from 'akutil-common-test';
import Editor from '../src/index';
import { service, analyticsHandler, debugHandler } from 'ak-editor-analytics';
import { ToolbarTextFormatting } from 'ak-editor-ui';
import BoldIcon from 'ak-icon/glyph/editor/bold';
import ItalicIcon from 'ak-icon/glyph/editor/bold';
import NumberListIcon from 'ak-icon/glyph/editor/list/number';
import BulletListIcon from 'ak-icon/glyph/editor/list/bullet';
import ImageIcon from 'ak-icon/glyph/editor/image';
import LinkIcon from 'ak-icon/glyph/editor/link';

chai.use(chaiPlugin);
chai.use(chaiEnzyme());
chai.use(sinonChai);

const expect = chai.expect;

describe('ak-editor-bitbucket/analytics/start-event', () => {
  it('atlassian.editor.start', () => {
    let handler = sinon.spy() as analyticsHandler;
    service.handler = handler;

    mount(<Editor />);
    expect(handler).to.not.have.been.called;

    mount(<Editor />).find('ChromeCollapsed').simulate('focus');
    expect(handler).to.have.been.calledOnce;
    expect(handler).to.have.been.calledWith('atlassian.editor.start');
  });
});

describe('ak-editor-bitbucket/analytics/formatting', () => {
  const fixture = fixtures();
  let handler: analyticsHandler | null;
  let editor: ReactWrapper<any, any>;
  let editorAPI: Editor | null;
  let pm: ProseMirror;
  
  beforeEach(() => {
    let container = fixture();
    let noop = () => {};
    handler = sinon.spy() as analyticsHandler;
    service.handler = handler;

    editor = mount(
      <Editor isExpandedByDefault onCancel={noop} onSave={noop} />,
      
      // We need to attach the editor to DOM because ProseMirror depends on having
      // focus on the content area (detached DOM elements can not receive focus)
      { attachTo: fixture() }
    );

    editorAPI = editor.get(0) as any;
    pm = editorAPI!.state!.pm as ProseMirror;
  });

  afterEach(() => {
    editor.detach();
    handler = service.handler = null;
  });

  it('atlassian.editor.format.hyperlink.button', () => {
    let toolbar = editor.find('ToolbarHyperlink');

    toolbar  
      .find(LinkIcon)
      .parent()
      .simulate('click');

    // enzyme currently requires setting value manually and simulating "change" event
    // https://github.com/airbnb/enzyme/issues/76
    let input = toolbar.find('Panel PanelTextInput input');
    (input.get(0) as any).value = 'http://atlassian.com';
    input.simulate('change');
    input.simulate('keyup', { which: 'enter', keyCode: 13 });
    
    expect(handler).to.have.been.calledWith('atlassian.editor.format.hyperlink.button');
  });

  it('atlassian.editor.format.bold.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find(BoldIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.format.bold.button');
  });

  it('atlassian.editor.format.bold.keyboard', () => {
    sendKeyToPm(pm, 'Mod-B');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.bold.keyboard');
  });

  it('atlassian.editor.format.bold.autoformatting', () => {
    pm.input.insertText(0, 0, '**text**');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.bold.autoformatting');
  });

  it('atlassian.editor.format.italic.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find(BoldIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.format.bold.button');
  });

  it('atlassian.editor.format.italic.autoformatting', () => {
    pm.input.insertText(0, 0, '_text_');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.italic.autoformatting');
  });

  it('atlassian.editor.format.italic.keyboard', () => {
    sendKeyToPm(pm, 'Mod-I');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.italic.keyboard');
  });

  // TODO: Re-enable once it's fixed
  it.skip('atlassian.editor.format.monospace.keyboard', () => {
    sendKeyToPm(pm, 'Mod-`');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.monospace.keyboard');
  });

  it('atlassian.editor.format.monospace.autoformatting', () => {
    pm.input.insertText(0, 0, '`text`');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.monospace.autoformatting');
  });

  it('atlassian.editor.format.list.numbered.button', () => {
    editor
      .find('ToolbarLists')
      .find(NumberListIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.format.list.numbered.button');
  });

  it('atlassian.editor.format.list.numbered.keyboard', () => {
    sendKeyToPm(pm, 'Shift-Mod-L');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.list.numbered.keyboard');
  });

  it('atlassian.editor.format.list.numbered.autoformatting', () => {
    pm.input.insertText(0, 0, '1. ');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.list.numbered.autoformatting');
  });  

  it('atlassian.editor.format.list.bullet.button', () => {
    editor
      .find('ToolbarLists')
      .find(BulletListIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.format.list.bullet.button');
  });

  it('atlassian.editor.format.list.bullet.keyboard', () => {
    sendKeyToPm(pm, 'Shift-Mod-B');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.list.bullet.keyboard');
  });

  it('atlassian.editor.format.list.bullet.autoformatting', () => {
    pm.input.insertText(0, 0, '* ');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.list.bullet.autoformatting');
  });  

  it('atlassian.editor.feedback.button', () => {
    editor
      .find('ToolbarFeedback > ToolbarIconButton')
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.feedback.button');
  });

  it('atlassian.editor.stop.save', () => {
    editor
      .find('AkButton')
      .filterWhere(n => n.text() === 'Save')
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.stop.save');
  });

  it('atlassian.editor.stop.cancel', () => {
    editor
      .find('AkButton')
      .filterWhere(n => n.text() === 'Cancel')
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.stop.cancel');
  });

  it('atlassian.editor.paste', function() {
    if (!dispatchPasteEvent(pm, { plain: 'foo' })) {
      this.skip('This environment does not support artificial paste events');
      return; 
    }

    expect(handler).to.have.been.calledWith('atlassian.editor.paste');
  });

  // TODO: refactor and re-enable after https://bitbucket.org/atlassian/atlaskit/pull-requests/1157
  it.skip('atlassian.editor.image.button', () => {
    editor
      .find('ToolbarIconButton')
      .find(ImageIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.image.button');
  });

  // TODO: refactor and re-enable after https://bitbucket.org/atlassian/atlaskit/pull-requests/1157
  it.skip('atlassian.editor.image.paste', function() {
    const editorAPI:Editor = editor.get(0) as any;
    const { pm } = editorAPI.state;

    // ...
   
    expect(handler).to.have.been.calledWith('atlassian.editor.image.paste');
  });

  // TODO: refactor and re-enable after https://bitbucket.org/atlassian/atlaskit/pull-requests/1157
  it.skip('atlassian.editor.image.drop', function() {
    const editorAPI:Editor = editor.get(0) as any;
    const { pm } = editorAPI.state;

    // ...
   
    expect(handler).to.have.been.calledWith('atlassian.editor.image.drop');
  });

  [
    'codeblock',
    'blockquote',
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'heading5',
    'heading6',
  ].forEach(blockTypeName => {
    it(`atlassian.editor.format.${blockTypeName}.button`, () => {
      editor.find('ToolbarBlockType').find('AkButton').simulate('click');
      editor
        .find('li')
        .filterWhere(n => n.key() === blockTypeName)
        .find('a')
        .simulate('click')
      ;

      expect(handler).to.have.been.calledWith(`atlassian.editor.format.${blockTypeName}.button`);
    });
  });

  // NOTE: Heading level 3 is currently the highest supported level
  for (let level = 1; level <= 3; level++) {
    it(`atlassian.editor.format.heading${level}.autoformatting`, () => {
      pm.input.insertText(0, 0, '#'.repeat(level) + ' ');
      expect(handler).to.have.been.calledWith(`atlassian.editor.format.heading${level}.autoformatting`);
    });
  }

  it('atlassian.editor.format.blockquote.keyboard', () => {
    sendKeyToPm(pm, isMac ? 'Cmd-Alt-8' : 'Ctrl-8');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.blockquote.keyboard');
  });

  it('atlassian.editor.format.blockquote.autoformatting', () => {
    pm.input.insertText(0, 0, '> ');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.blockquote.autoformatting');
  });  

  it('atlassian.editor.format.codeblock.keyboard', () => {
    sendKeyToPm(pm, isMac ? 'Cmd-Alt-7' : 'Ctrl-7');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.codeblock.keyboard');
  });

  it('atlassian.editor.format.codeblock.autoformatting', () => {
    pm.input.insertText(0, 0, '```');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.codeblock.autoformatting');
  });  
});