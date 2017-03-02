import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { CodeBlockNodeType, DocNodeType } from '../../../src';

describe('@atlaskit/editor-core/schema doc node', () => {
  it('throws an error if it is not named "doc"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          foo: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "doc"', () => {
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
});
