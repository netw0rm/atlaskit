import * as React from 'react';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { mount } from 'enzyme';
import { chaiPlugin, createEvent } from 'ak-editor-core/test-helper';
import Editor from '../src';

chai.use(chaiPlugin);
chai.use(((chaiEnzyme as any).default || chaiEnzyme)());
chai.use((sinonChai as any).default || sinonChai);

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

describe('ak-editor-hipchat', () => {
  let editor: Editor;

  describe('Keymap', () => {

    it('should insert new line when user press Shift-Enter', () => {
      editor = mount(<Editor />).get(0) as any;
      const { pm } = editor.state;

      pm!.input.dispatchKey('Shift-Enter', new CustomEvent('keydown'));

      expect(editor.value).to.deep.equal([{
        type: 'text',
        text: '\n',
        marks: []
      }]);
    });

    it('should trigger onSubmit when user press Enter', () => {
      const spy = sinon.spy();
      editor = mount(<Editor onSubmit={spy} />).get(0) as any;
      const { pm } = editor.state;

      pm!.input.dispatchKey('Enter', new CustomEvent('keydown'));
      expect(spy).to.have.been.calledWith(editor.value);
    });

  });

  describe('MaxContentSize', () => {

    it('should prevent the user from entering more text if it node size is > maxContentSize', () => {
      editor = mount(<Editor maxContentSize={9} />).get(0) as any;
      const { pm } = editor.state;

      pm!.tr.typeText('Hello').applyAndScroll();
      pm!.tr.typeText('!').applyAndScroll();
      pm!.flush();

      expect(editor.value).to.deep.equal([{
        type: 'text',
        text: 'Hello',
        marks: []
      }]);
    });

  });

  describe('API', () => {

    beforeEach(() => {
      editor = mount(<Editor />).get(0) as any;
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
