import { expect } from 'chai';
import { DocNodeType, ImageNodeType, Schema, Text } from '../../../src';

describe('@atlaskit/editor-core/schema image node', () => {
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
  });

  it('does not throw an error if it is named "image"', () => {
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
