import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import AkButton from '@atlaskit/button';
import { doc, p, makeEditor } from '../../../src/test-helper';
import ChromeExpanded from '../../../src/ui/ChromeExpanded';
import HyperlinkEdit from '../../../src/ui/HyperlinkEdit';
import LanguagePicker from '../../../src/ui/LanguagePicker';
import MentionPicker from '../../../src/ui/MentionPicker';
import EmojiTypeAhead from '../../../src/ui/EmojiTypeAhead';
import PanelEdit from '../../../src/ui/PanelEdit';
import ToolbarMention from '../../../src/ui/ToolbarMention';
import ToolbarHelp from '../../../src/ui/ToolbarHelp';
import HelpDialog from '../../../src/ui/HelpDialog';
import ToolbarImage from '../../../src/ui/ToolbarImage';
import ToolbarMedia from '../../../src/ui/ToolbarMedia';
import { createNestedListStyles } from '../../../src/ui/ChromeExpanded/styles';
import { Content } from '../../../src/ui/ChromeExpanded/styles';
import { analyticsService } from '../../../src/analytics';
import { browser } from '../../../src/prosemirror';

const noop = () => {};

describe('@atlaskit/editor-core/ui/ChromeExpanded', () => {
  const editor = (doc: any) => makeEditor({
    doc,
  });

  describe('props', () => {
    it('should render enabled save button by default', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop}/>);

      const button = chrome.find(AkButton).filterWhere(node => node.text() === 'Save');
      expect(button.prop('isDisabled')).to.equal(false);
    });

    it('should render enabled save button if saveDisabled=false', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop} saveDisabled={false}/>);

      const button = chrome.find(AkButton).filterWhere(node => node.text() === 'Save');
      expect(button.prop('isDisabled')).to.equal(false);
    });

    it('should add maxHeight to content section if it\'s passed', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop} saveDisabled={false} maxHeight={75} />);

      const wrapper = chrome.find(Content).find('div').at(1);
      expect(!!wrapper).to.equal(true);
      const props = wrapper.props();
      expect(!!props['style']).to.equal(true);
      expect(props['style']!.maxHeight).to.equal('75px');
    });

    it('should render disabled save button if saveDisabled=true', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop} saveDisabled={true} />);

      const button = chrome.find(AkButton).filterWhere(node => node.text() === 'Save');
      expect(button.prop('isDisabled')).to.equal(true);
    });

    it('should disable UI elements when disabled=true', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded
        editorView={editorView}
        onSave={noop}
        disabled={true}
      />);

      expect(chrome.find(HyperlinkEdit)).to.have.length(0);
      expect(chrome.find(LanguagePicker)).to.have.length(0);
      expect(chrome.find(MentionPicker)).to.have.length(0);
      expect(chrome.find(EmojiTypeAhead)).to.have.length(0);
      expect(chrome.find(PanelEdit)).to.have.length(0);
      expect(chrome.find(ToolbarMention)).to.have.length(0);
      expect(chrome.find(ToolbarImage)).to.have.length(0);
      expect(chrome.find(ToolbarMedia)).to.have.length(0);
    });


    describe('analytics', () => {
      let trackEvent;
      let toolbarOption;
      beforeEach(() => {
        const { editorView } = editor(doc(p()));
        toolbarOption = mount(<ChromeExpanded editorView={editorView} onSave={noop} onCancel={noop} saveDisabled={true} />);
        trackEvent = sinon.spy();
        analyticsService.trackEvent = trackEvent;
      });

      it('should trigger analyticsService.trackEvent when save button is clicked', () => {
        toolbarOption.find(AkButton).filterWhere(n => n.text() === 'Save').simulate('click');
        expect(trackEvent.calledWith('atlassian.editor.stop.save')).to.equal(true);
      });

      it('should trigger analyticsService.trackEvent when cancel button is clicked', () => {
        toolbarOption.find(AkButton).filterWhere(n => n.text() === 'Cancel').simulate('click');
        expect(trackEvent.calledWith('atlassian.editor.stop.cancel')).to.equal(true);
      });
    });
  });

  describe('styles/createNestedListStyles', () => {
    it('should return not-null object for nested ordered list styles', () => {
      const nestedOrderedListStyle = createNestedListStyles();
      expect(nestedOrderedListStyle).to.not.equal(null);
    });

    it('should return not-null object for nested ordered list styles', () => {
      const nestedOrderedListStyle = createNestedListStyles();
      expect(Object.keys(nestedOrderedListStyle).length).to.eq(9);
    });

    it('should return correct values in the object', () => {
      const nestedOrderedListStyle = createNestedListStyles();
      expect(Object.keys(nestedOrderedListStyle[' > li'])).to.not.equal(undefined);
      expect(Object.keys(nestedOrderedListStyle[' > li > ol > li'])).to.not.equal(undefined);
      expect(Object.keys(nestedOrderedListStyle[' > li > ol > li > ol > li'])).to.not.equal(undefined);
      expect(Object.keys(nestedOrderedListStyle[' > li > ol > li > ol > li > ol > li'])).to.not.equal(undefined);
    });

    it('should return correct styles for list items', () => {
      const nestedOrderedListStyle = createNestedListStyles();
      expect(Object.keys(nestedOrderedListStyle[' > li'].listStyleType)).not.equal('decimal');
      expect(Object.keys(nestedOrderedListStyle[' > li > ol > li'].listStyleType)).not.equal('lower-alpha');
      expect(Object.keys(nestedOrderedListStyle[' > li > ol > li > ol > li'].listStyleType)).not.equal('lower-roman');
    });
  });

  describe('helpDialog', () => {
    let keyEvent;
    beforeEach(() => {
      if (browser.mac) {
        keyEvent = { metaKey: true, key: '/' };
      } else {
        keyEvent = { ctrlKey: true, key: '/' };
      }
    });

    it('should set state variable showHelp true if help dialog is present and Cmd-/ is entered', () => {
      const { editorView } = editor(doc(p()));
      const chromeExpanded = mount(<ChromeExpanded editorView={editorView} helpDialogPresent={true} onSave={noop} onCancel={noop} saveDisabled={true} />);
      expect(chromeExpanded.state('showHelp')).to.equal(false);
      chromeExpanded.simulate('keyDown', keyEvent);
      expect(chromeExpanded.state('showHelp')).to.equal(true);
      const toolbarHelp = chromeExpanded.find(ToolbarHelp);
      expect(toolbarHelp.prop('showHelp')).to.equal(true);
    });

    it('should set state variable showHelp true when open help dialog button is clicked', () => {
      const { editorView } = editor(doc(p()));
      const chromeExpanded = mount(<ChromeExpanded editorView={editorView} helpDialogPresent={true} onSave={noop} onCancel={noop} saveDisabled={true} />);
      expect(chromeExpanded.state('showHelp')).to.equal(false);
      const toolbarHelp = chromeExpanded.find(ToolbarHelp);
      toolbarHelp.find(AkButton).simulate('click');
      expect(chromeExpanded.state('showHelp')).to.equal(true);
      const helpDialog = toolbarHelp.find(HelpDialog);
      expect(helpDialog.isEmpty()).to.equal(false);
    });

    it('should track analytics when helpDialog is opened using key event Cmd-/', () => {
      const { editorView } = editor(doc(p()));
      const trackEvent = sinon.spy();
      analyticsService.trackEvent = trackEvent;
      const chromeExpanded = mount(<ChromeExpanded editorView={editorView} helpDialogPresent={true} onSave={noop} onCancel={noop} saveDisabled={true} />);
      chromeExpanded.simulate('keyDown', keyEvent);
      expect(trackEvent.calledWith('atlassian.editor.help.keyboard')).to.equal(true);
    });

    it('should reset state variable showHelp if help dialog is present and Escape is entered', () => {
      const { editorView } = editor(doc(p()));
      const chromeExpanded = mount(<ChromeExpanded editorView={editorView} helpDialogPresent={true} onSave={noop} onCancel={noop} saveDisabled={true} />);
      chromeExpanded.setState({'showHelp': true});
      expect(chromeExpanded.state('showHelp')).to.equal(true);
      chromeExpanded.simulate('keyDown', { key: 'Escape' });
      expect(chromeExpanded.state('showHelp')).to.equal(false);
      const toolbarHelp = chromeExpanded.find(ToolbarHelp);
      expect(toolbarHelp.prop('showHelp')).to.equal(false);
    });
  });
});
