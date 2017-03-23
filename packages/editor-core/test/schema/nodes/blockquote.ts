import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { BlockQuoteNodeType, DocNodeType } from '../../../src';

describe('@atlaskit/editor-core/schema blockquote node', () => {
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
  });

  it('does not throw an error if it is named "blockquote"', () => {
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
