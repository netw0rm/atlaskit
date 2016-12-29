import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, Text, DocNodeType, CodeBlockNodeType } from '../../../src';
import { toHTML, fromHTML } from '../../../test-helper';

describe('ak-editor-core/schema code_block node', () => {
  it('throws an error if it is not named "code_block"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: CodeBlockNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "code_block"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          code_block: { type: CodeBlockNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });

  describe('parse from html', () => {
    const schema = new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'block+' },
          code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
          text: { type: Text, group: 'inline' }
        }
      });

    context('when language is not set', () => {
      it('converts to block code node', () => {
        const doc = fromHTML('<pre><span>window.alert("hello");<span></pre>', schema);

        expect(doc.firstChild.type).to.be.an.instanceOf(CodeBlockNodeType);
      });
    });

    context('when language is set', () => {
      it('converts to block code node', () => {
        const doc = fromHTML('<pre data-lang="javascript"><span>window.alert("hello");<span></pre>', schema);

        expect(doc.firstChild.type).to.be.an.instanceOf(CodeBlockNodeType);
      });

      it('extracts language atrribute', () => {
        const doc = fromHTML('<pre data-lang="javascript"><span>window.alert("hello");<span></pre>', schema);
        expect(doc.firstChild.attrs.language).to.eq('javascript');
      });
    });
  });
});
