import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures, sendKeyToPm } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as chai from 'chai';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import stringRepeat from '../src/util/string-repeat';

import { analyticsService, browser, ProseMirror } from '@atlaskit/editor-core';

import Editor from '../src/index';

chai.use(chaiPlugin);

describe('@atlaskit/editor-bitbucket/analytics/start-event', () => {
  it('atlassian.editor.start', () => {
    const handler = sinon.spy();
    analyticsService.handler = handler;

    mount(<Editor analyticsHandler={handler} />);
    expect(handler.called).to.equal(false);

    mount(<Editor analyticsHandler={handler} />).find('ChromeCollapsed').simulate('focus');
    expect(handler.callCount).to.equal(1);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
  });

  it('atlassian.editor.start with two child editors sharing a handler', () => {
    const handler = sinon.spy();
    analyticsService.handler = handler;

    class ContainerWithTwoEditors extends React.PureComponent<{}, {}> {
      render() {
        return (
          <div>
            <Editor isExpandedByDefault analyticsHandler={handler} />
            <Editor isExpandedByDefault analyticsHandler={handler} />
          </div>
        );
      }
    }

    expect(handler.called).to.equal(false);
    mount(<ContainerWithTwoEditors />);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
    expect(handler.callCount).to.equal(2);
  });

  it('editor.start must not be called when unmounting component', () => {
    const handler = sinon.spy();
    analyticsService.handler = handler;

    mount(<Editor analyticsHandler={handler} isExpandedByDefault />).unmount();
    expect(handler.callCount).to.equal(1);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
  });
});

describe('@atlaskit/editor-bitbucket/analytics/analyticsHandler', () => {
  it('updates analytics handler when provided via property', () => {
    const handler = sinon.spy();
    mount(<Editor analyticsHandler={handler} />);
    expect(handler.called).to.equal(false);

    mount(<Editor analyticsHandler={handler} />).find('ChromeCollapsed').simulate('focus');
    expect(handler.callCount).to.equal(1);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
  });
});

describe('@atlaskit/editor-bitbucket/analytics/formatting', () => {
  const fixture = fixtures();
  let handler;
  let editor: ReactWrapper<any, any>;
  let editorAPI: Editor | null;
  let pm: ProseMirror;

  beforeEach(() => {
    const noop = () => { };
    handler = sinon.spy();

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
    const toolbar = editor.find('ToolbarHyperlink');

    toolbar
      .find('EditorLinkIcon')
      .parent()
      .simulate('click');

    // enzyme currently requires setting value manually and simulating "change" event
    // https://github.com/airbnb/enzyme/issues/76
    const input = toolbar.find('FloatingToolbar PanelTextInput input');
    (input.get(0) as any).value = 'http://atlassian.com';
    input.simulate('change');
    input.simulate('keydown', { which: 'enter', keyCode: 13 });

    expect(handler.calledWith('atlassian.editor.format.hyperlink.button')).to.equal(true);
  });

  it('atlassian.editor.format.strong.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find('EditorBoldIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.strong.button')).to.equal(true);
  });

  it('atlassian.editor.format.strong.keyboard', () => {
    sendKeyToPm(pm, 'Mod-B');
    expect(handler.calledWith('atlassian.editor.format.strong.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.strong.autoformatting', () => {
    pm.input.insertText(0, 0, '**text**');
    expect(handler.calledWith('atlassian.editor.format.strong.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.em.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find('EditorBoldIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.strong.button')).to.equal(true);
  });

  it('atlassian.editor.format.em.autoformatting', () => {
    pm.input.insertText(0, 0, '*text*');
    expect(handler.calledWith('atlassian.editor.format.em.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.em.keyboard', () => {
    sendKeyToPm(pm, 'Mod-I');
    expect(handler.calledWith('atlassian.editor.format.em.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.code.keyboard', () => {
    sendKeyToPm(pm, 'Mod-Shift-M');
    expect(handler.calledWith('atlassian.editor.format.code.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.code.autoformatting', () => {
    pm.input.insertText(0, 0, '`text`');
    expect(handler.calledWith('atlassian.editor.format.code.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.list.numbered.button', () => {
    editor
      .find('ToolbarLists')
      .find('EditorNumberListIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.list.numbered.button')).to.equal(true);
  });

  it('atlassian.editor.format.list.numbered.keyboard', () => {
    sendKeyToPm(pm, 'Shift-Mod-L');
    expect(handler.calledWith('atlassian.editor.format.list.numbered.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.list.numbered.autoformatting', () => {
    pm.input.insertText(0, 0, '1. ');
    expect(handler.calledWith('atlassian.editor.format.list.numbered.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.list.bullet.button', () => {
    editor
      .find('ToolbarLists')
      .find('EditorBulletListIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.list.bullet.button')).to.equal(true);
  });

  it('atlassian.editor.format.list.bullet.keyboard', () => {
    sendKeyToPm(pm, 'Shift-Mod-B');
    expect(handler.calledWith('atlassian.editor.format.list.bullet.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.list.bullet.autoformatting', () => {
    pm.input.insertText(0, 0, '* ');
    expect(handler.calledWith('atlassian.editor.format.list.bullet.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.feedback.button', () => {
    window.jQuery = { ajax() { } };
    const noop = () => { };

    editor = mount(
      <Editor isExpandedByDefault onCancel={noop} onSave={noop} imageUploadHandler={noop} analyticsHandler={handler} />,

      // We need to attach the editor to DOM because ProseMirror depends on having
      // focus on the content area (detached DOM elements can not receive focus)
      { attachTo: fixture() }
    );

    editor
      .find('ToolbarFeedback > ToolbarButton')
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.feedback.button')).to.equal(true);
  });

  it('atlassian.editor.stop.save', () => {
    editor
      .find('AkButton')
      .filterWhere(n => n.text() === 'Save')
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.stop.save')).to.equal(true);
  });

  it('atlassian.editor.stop.cancel', () => {
    editor
      .find('AkButton')
      .filterWhere(n => n.text() === 'Cancel')
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.stop.cancel')).to.equal(true);
  });

  it('atlassian.editor.paste', function () {
    if (!dispatchPasteEvent(pm, { plain: 'foo' })) {
      // This environment does not support artificial paste events
      return this.skip();
    }

    expect(handler.calledWith('atlassian.editor.paste')).to.equal(true);
  });

  it('atlassian.editor.image.button', () => {
    editor
      .find('ToolbarButton')
      .find('EditorImageIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.image.button')).to.equal(true);
  });

  it('atlassian.editor.image.paste', function () {
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
      // This environment does not allow mocking paste events
      return this.skip();
    }

    contentArea.dispatchEvent(event);
    expect(handler.calledWith('atlassian.editor.image.paste')).to.equal(true);
  });

  it('atlassian.editor.image.drop', () => {
    // Note: Mobile Safari and OSX Safari 9 do not bubble CustomEvent of type 'drop'
    //       so we must dispatch the event directly on the event which has listener attached.
    const dropElement: HTMLElement = (editor.get(0) as any).state.pm.content.parentNode;
    const event = createEvent('drop');

    Object.defineProperties(event, {
      dataTransfer: {
        value: {
          getData: (type: string) => '',
          setData: () => { },
          clearData: () => { },
          types: ['Files'],
          files: [],
          items: [],
        }
      }
    });

    dropElement.dispatchEvent(event);
    expect(handler.calledWith('atlassian.editor.image.drop')).to.equal(true);
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
        .find('Item')
        .filterWhere(n => n.key() === blockTypeName)
        .find('Element')
        .simulate('click');

      expect(handler.calledWith(`atlassian.editor.format.${blockTypeName}.button`)).to.equal(true);
    });
  });

  for (let level = 1; level <= 5; level++) {
    it(`atlassian.editor.format.heading${level}.autoformatting`, () => {
      pm.input.insertText(0, 0, stringRepeat('#', level) + ' ');
      expect(handler.calledWith(`atlassian.editor.format.heading${level}.autoformatting`)).to.equal(true);
    });
  }

  for (let level = 1; level <= 5; level++) {
    it(`atlassian.editor.format.heading${level}.keyboard`, () => {
      sendKeyToPm(pm, browser.mac ? `Cmd-Alt-${level}` : `Ctrl-${level}`);
      expect(handler.calledWith(`atlassian.editor.format.heading${level}.keyboard`)).to.equal(true);
    });
  }

  it('atlassian.editor.format.blockquote.keyboard', () => {
    sendKeyToPm(pm, browser.mac ? 'Cmd-Alt-7' : 'Ctrl-7');
    expect(handler.calledWith('atlassian.editor.format.blockquote.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.blockquote.autoformatting', () => {
    pm.input.insertText(0, 0, '> ');
    expect(handler.calledWith('atlassian.editor.format.blockquote.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.codeblock.keyboard', () => {
    sendKeyToPm(pm, browser.mac ? 'Cmd-Alt-8' : 'Ctrl-8');
    expect(handler.calledWith('atlassian.editor.format.codeblock.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.codeblock.autoformatting', () => {
    pm.input.insertText(0, 0, '```');
    sendKeyToPm(pm, 'Enter');
    expect(handler.calledWith('atlassian.editor.format.codeblock.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.newline.keyboard', () => {
    sendKeyToPm(pm, 'Shift-Enter');
    expect(handler.calledWith('atlassian.editor.newline.keyboard')).to.equal(true);
  });

  it('atlassian.editor.horizontalrule.keyboard', () => {
    sendKeyToPm(pm, 'Mod-Shift-minus');
    expect(handler.calledWith('atlassian.editor.format.horizontalrule.keyboard')).to.equal(true);
  });
});
