import { Schema, Text } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, BlockQuoteNodeType } from '../../src';

describe('ak-editor-schema blockquote node', () => {
  it('throws an error if it is not named "blockquote"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: BlockQuoteNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);

    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          blockquote: { type: BlockQuoteNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });
});
