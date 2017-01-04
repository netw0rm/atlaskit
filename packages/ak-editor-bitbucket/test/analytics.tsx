import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiEnzyme from 'chai-enzyme';
import { shallow, mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { doc, strong, h1, p } from './_schema-builder';
import stringRepeat from '../src/util/string-repeat';
import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures, sendKeyToPm } from 'ak-editor-core/test-helper';

import { ProseMirror, browser, ToolbarTextFormatting, service, AnalyticsHandler, debugHandler } from 'ak-editor-core';
import BoldIcon from 'ak-icon/glyph/editor/bold';
import ItalicIcon from 'ak-icon/glyph/editor/bold';
import NumberListIcon from 'ak-icon/glyph/editor/list/number';
import BulletListIcon from 'ak-icon/glyph/editor/list/bullet';
import ImageIcon from 'ak-icon/glyph/editor/image';
import LinkIcon from 'ak-icon/glyph/editor/link';

import Editor from '../src/index';

chai.use(chaiPlugin);
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('ak-editor-bitbucket/analytics/start-event', () => {
  it('atlassian.editor.start', () => {
    let handler = sinon.spy() as AnalyticsHandler;
    service.handler = handler;

    mount(<Editor analyticsHandler={handler} />);
    expect(handler).to.not.have.been.called;

    mount(<Editor analyticsHandler={handler} />).find('ChromeCollapsed').simulate('focus');
    expect(handler).to.have.been.calledOnce;
    expect(handler).to.have.been.calledWith('atlassian.editor.start');
  });

  it('editor.start must not be called when unmounting component', () => {
    let handler = sinon.spy() as AnalyticsHandler;
    service.handler = handler;

    mount(<Editor analyticsHandler={handler} isExpandedByDefault />).unmount();
    expect(handler).to.have.been.calledOnce;
    expect(handler).to.have.been.calledWith('atlassian.editor.start');
  });
});

describe('ak-editor-bitbucket/analytics/analyticsHandler', () => {
  it('updates analytics handler when provided via property', () => {
    let handler = sinon.spy() as AnalyticsHandler;
    mount(<Editor analyticsHandler={handler} />);
    expect(handler).to.not.have.been.called;

    mount(<Editor analyticsHandler={handler} />).find('ChromeCollapsed').simulate('focus');
    expect(handler).to.have.been.calledOnce;
    expect(handler).to.have.been.calledWith('atlassian.editor.start');
  });
});

describe('ak-editor-bitbucket/analytics/formatting', () => {
  const fixture = fixtures();
  let handler: AnalyticsHandler | null;
  let editor: ReactWrapper<any, any>;
  let editorAPI: Editor | null;
  let pm: ProseMirror;

  beforeEach(() => {
    let container = fixture();
    let noop = () => {};
    handler = sinon.spy() as AnalyticsHandler;

    editor = mount(
      <Editor isExpandedByDefault onCancel={noop} onSave={noop} imageUploadHandler={noop} analyticsHandler={handler} />,

      // We need to attach the editor to DOM because ProseMirror depends on having
      // focus on the content area (detached DOM elements can not receive focus)
      { attachTo: fixture() }
    );

    editorAPI = editor.get(0) as any;
    pm = editorAPI!.state!.pm as ProseMirror;
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

  it('atlassian.editor.format.strong.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find(BoldIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.format.strong.button');
  });

  it('atlassian.editor.format.strong.keyboard', () => {
    sendKeyToPm(pm, 'Mod-B');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.strong.keyboard');
  });

  it('atlassian.editor.format.strong.autoformatting', () => {
    pm.input.insertText(0, 0, '**text**');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.strong.autoformatting');
  });

  it('atlassian.editor.format.em.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find(BoldIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.format.strong.button');
  });

  it('atlassian.editor.format.em.autoformatting', () => {
    pm.input.insertText(0, 0, '_text_');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.em.autoformatting');
  });

  it('atlassian.editor.format.em.keyboard', () => {
    sendKeyToPm(pm, 'Mod-I');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.em.keyboard');
  });

  it('atlassian.editor.format.mono.keyboard', () => {
    sendKeyToPm(pm, 'Mod-Shift-M');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.mono.keyboard');
  });

  it('atlassian.editor.format.mono.autoformatting', () => {
    pm.input.insertText(0, 0, '`text`');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.mono.autoformatting');
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

  it('atlassian.editor.image.button', () => {
    editor
      .find('ToolbarIconButton')
      .find(ImageIcon)
      .parent()
      .simulate('click');

    expect(handler).to.have.been.calledWith('atlassian.editor.image.button');
  });

  it('atlassian.editor.image.paste', function() {
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
    expect(handler).to.have.been.calledWith('atlassian.editor.image.paste');
  });

  it('atlassian.editor.image.drop', () => {
    const editorAPI: Editor = editor.get(0) as any;
    const { pm } = editorAPI.state;

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

  for (let level = 1; level <= 5; level++) {
    it(`atlassian.editor.format.heading${level}.autoformatting`, () => {
      pm.input.insertText(0, 0, stringRepeat('#', level) + ' ');
      expect(handler).to.have.been.calledWith(`atlassian.editor.format.heading${level}.autoformatting`);
    });
  }

  for (let level = 1; level <= 5; level++) {
    it(`atlassian.editor.format.heading${level}.keyboard`, () => {
      sendKeyToPm(pm, browser.mac ? `Cmd-Alt-${level}` : `Ctrl-${level}`);
      expect(handler).to.have.been.calledWith(`atlassian.editor.format.heading${level}.keyboard`);
    });
  }

  it('atlassian.editor.format.blockquote.keyboard', () => {
    sendKeyToPm(pm, browser.mac ? 'Cmd-Alt-7' : 'Ctrl-7');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.blockquote.keyboard');
  });

  it('atlassian.editor.format.blockquote.autoformatting', () => {
    pm.input.insertText(0, 0, '> ');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.blockquote.autoformatting');
  });

  it('atlassian.editor.format.codeblock.keyboard', () => {
    sendKeyToPm(pm, browser.mac ? 'Cmd-Alt-8' : 'Ctrl-8');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.codeblock.keyboard');
  });

  it('atlassian.editor.format.codeblock.autoformatting', () => {
    pm.input.insertText(0, 0, '```');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.codeblock.autoformatting');
  });

  it('atlassian.editor.newline.keyboard', () => {
    sendKeyToPm(pm, 'Shift-Enter');
    expect(handler).to.have.been.calledWith('atlassian.editor.newline.keyboard');
  });

  it('atlassian.editor.horizontalrule.keyboard', () => {
    sendKeyToPm(pm, 'Mod-Shift-minus');
    expect(handler).to.have.been.calledWith('atlassian.editor.format.horizontalrule.keyboard');
  });
});
