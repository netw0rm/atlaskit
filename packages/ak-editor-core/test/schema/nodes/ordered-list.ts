import { Schema, Text } from '../../../src';
import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, OrderedListNodeType } from '../../../src';

describe('ak-editor-core/schema ordered_list node', () => {
  it('throws an error if it is not named "ordered_list"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: OrderedListNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "ordered_list"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          ordered_list: { type: OrderedListNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });
});
