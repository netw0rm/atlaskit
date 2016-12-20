import { Schema, Text } from '../../../src';
import { default as chai, expect } from 'chai';
import { DocNodeType } from '../../../src';

describe('ak-editor-core/schema doc node', () => {
  it('throws an error if it is not named "doc"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });
});
