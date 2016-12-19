import { default as chai, expect } from 'chai';
import { Schema, Text, DocNodeType, ImageNodeType } from '../../../src';

describe('ak-editor-core/schema image node', () => {
  it('throws an error if it is not named "image"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          foo: { type: ImageNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);

    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          image: { type: ImageNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });
});
