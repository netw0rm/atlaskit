import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import AkButton from '@atlaskit/button';
import { fixtures, doc, p, makeEditor } from '../../../src/test-helper';
import ChromeExpanded from '../../../src/ui/ChromeExpanded';
import { createNestedListStyles } from '../../../src/ui/ChromeExpanded/styles';

const noop = () => {};

describe('@atlaskit/editor-core/ui/ChromeExpanded', () => {

  describe('props', () => {
    const fixture = fixtures();
    const editor = (doc: any) => makeEditor({
      doc,
      place: fixture()
    });

    it('should render enabled save button by default', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop}/>);

      const button = chrome.find(AkButton);
      expect(button.prop('isDisabled')).to.equal(false);
    });

    it('should render enabled save button if saveDisabled=false', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop} saveDisabled={false}/>);

      const button = chrome.find(AkButton);
      expect(button.prop('isDisabled')).to.equal(false);
    });

    it('should render disabled save button if saveDisabled=true', () => {
      const { editorView } = editor(doc(p()));
      const chrome = mount(<ChromeExpanded editorView={editorView} onSave={noop} saveDisabled={true} />);

      const button = chrome.find(AkButton);
      expect(button.prop('isDisabled')).to.equal(true);
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

});
