import { Schema, Text } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, CodeBlockNodeType } from '../../src';

describe('ak-editor-schema code_block node', () => {
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
