import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import HelpDialog, { formatting, getComponentFromKeymap } from '../../../../../../src/editor/plugins/help-dialog/ui';
import createEditor from '../../../../../helpers/create-editor';
import helpDialog from '../../../../../../src/editor/plugins/help-dialog';
import * as keymaps from '../../../../../../src/keymaps';
import { browser } from '../../../../../../src/prosemirror';
import { EditorView } from '../../../../../../src/prosemirror';
import EditorActions from '../../../../../../src/editor/actions';

describe('@atlaskit/editor-core/editor/ui/HelpDialog', () => {

  let editorActions: EditorActions;
  let editorView: EditorView;
  beforeEach(() => {
    const editor = createEditor([helpDialog]);
    editorActions = new EditorActions();
    editorActions._privateRegisterEditor(editor.editorView);
    editorView = editor.editorView;
  });

  it('should not be null if isVisible is true', () => {
    const helpDialog = mount(<HelpDialog editorView={editorView} isVisible={true} />);
    expect(helpDialog).to.not.equal(null);
  });

  it('should return correct description of codemap when getComponentFromKeymap is called', () => {
    const key = getComponentFromKeymap(keymaps.toggleBold);
    const shortcut = mount(<div>{key}</div>);
    if (browser.mac) {
      expect(shortcut.text()).to.equal('⌘ + b');
    } else {
      expect(shortcut.text()).to.equal('ctrl + b');
    }
  });

  describe('formatting', () => {
    it('should be an array for verious formattings supported', () => {
      expect(formatting instanceof Array).to.equal(true);
    });

    it('should have value defined for quote', () => {
      expect(formatting.filter(f => f.name === 'Bold').length).to.equal(1);
      expect(formatting.filter(f => f.name === 'Quote').length).to.equal(1);
      expect(formatting.filter(f => f.name === 'Link').length).to.equal(1);
    });

    it('should have a value of type keymap in keymap property', () => {
      expect(formatting.filter(f => f.name === 'Quote')[0].keymap === keymaps.toggleBlockQuote).to.equal(true);
    });

    it('should have correct value for auto-formatting', () => {
      const autoformat = formatting.filter(f => f.name === 'Quote')[0].autoFormatting;
      const label = mount(<div>{autoformat!()}</div>);
      expect(label.text()).to.equal('> + space');
    });
  });
});
