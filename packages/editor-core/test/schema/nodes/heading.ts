import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { DocNodeType, HeadingNodeType } from '../../../src';

describe('@atlaskit/editor-core/schema heading node', () => {
  it('throws an error if it is not named "heading{1..5}"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: HeadingNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it(`does not throw an error if it is named "heading"`, () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          heading: { type: HeadingNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });

});
