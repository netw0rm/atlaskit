import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { chaiPlugin, sendKeyToPm } from '@atlaskit/editor-core/dist/es5/test-helper';
import { mount, ReactWrapper } from 'enzyme';
import Editor from '../src';

chai.use(chaiPlugin);

const { expect } = chai;

const defaultValue = [
  {
    type: 'text',
    text: 'Hello'
  },
  {
    type: 'mention',
    attrs: {
      displayName: '@World',
      id: '1234'
    }
  }
];

describe('@atlaskit/editor-hipchat', () => {
  let editorWrapper: ReactWrapper<any, any>;

  afterEach(() => {
    editorWrapper.unmount();
  });

  describe('Keymap', () => {

    it('should insert new line when user press Shift-Enter', () => {
      editorWrapper = mount(<Editor />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;
      sendKeyToPm(editorView!, 'Shift-Enter');

      expect(editor.value).to.deep.equal([{
        type: 'text',
        text: '\n',
        marks: []
      }]);
    });

    it('should trigger onSubmit when user press Enter', () => {
      const spy = sinon.spy();
      editorWrapper = mount(<Editor onSubmit={spy} />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;
      sendKeyToPm(editorView!, 'Enter');

      expect(spy.calledWith(editor.value)).to.equal(true);
    });

  });

  describe('MaxContentSize', () => {

    it('should prevent the user from entering more text if it node size is > maxContentSize', () => {
      editorWrapper = mount(<Editor maxContentSize={9} />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;

      editorView.dispatch(editorView.state.tr.insertText('Hello'));
      editorView.dispatch(editorView.state.tr.insertText('!'));

      expect(editor.value).to.deep.equal([{
        type: 'text',
        text: 'Hello',
        marks: []
      }]);
    });

    it('should add css-classes for indicating that you have reached max content size', () => {
      editorWrapper = mount(<Editor maxContentSize={9} />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;

      editorView.dispatch(editorView.state.tr.insertText('Hello'));
      editorView.dispatch(editorView.state.tr.insertText('!'));

      expect(editorWrapper.find('.max-length-reached').length).to.eq(1);
      expect(editorWrapper.find('.flash-toggle').length).to.eq(0);

      editorView.dispatch(editorView.state.tr.insertText('!'));

      expect(editorWrapper.find('.flash-toggle').length).to.eq(1);
    });

  });

  describe('API', () => {

    let editor;

    beforeEach(() => {
      editorWrapper = mount(<Editor />);
      editor = editorWrapper.get(0) as any;
      editor.setFromJson(defaultValue);
    });

    describe('.documentSize', () => {
      it('returns the node size of the current document', () => {
        expect(editor.documentSize).to.equal(10);
      });
    });

    describe('.value', () => {
      it('returns hipchat-friendly json-object', () => {
        expect(editor.value).to.deep.equal([
        {
            type: 'text',
            text: 'Hello',
            marks: []
          },
          {
            type: 'mention',
            attrs: {
              displayName: '@World',
              id: '1234'
            },
            text: '@World'
          }
        ]);
      });
    });

    describe('.setFromJson()', () => {
      it('creates a new document based on json-object', () => {
        const value = [
          {
            type: 'text',
            text: 'Yo!',
            marks: []
          }
        ];

        editor.setFromJson(value);
        expect(editor.value).to.deep.equal(value);
      });
    });

    describe('.clear()', () => {
      it('Clears the content of the editor, making it an empty document', () => {
        editor.clear();
        expect(editor.documentSize).to.equal(4);
      });
    });

  });

});
