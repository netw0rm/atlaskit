import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, Schema, StrongMarkType, Text } from '../../../src';
import { chaiPlugin } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('@atlaskit/editor-core/schema strong mark', () => {
  it('throws an error if it is not named "strong"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: StrongMarkType
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "strong"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          strong: StrongMarkType
        }
      });
    }).to.not.throw(Error);
  });
});
