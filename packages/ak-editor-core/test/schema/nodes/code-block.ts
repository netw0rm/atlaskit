import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, Text, DocNodeType, CodeBlockNodeType } from '../../../src';

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
