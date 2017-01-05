import * as chai from 'chai';
import { expect } from 'chai';
import { Node, Schema, Text, DocNodeType, EmMarkType } from '../../../src';
import { fromHTML, toHTML, chaiPlugin } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema em mark', () => {
  it('throws an error if it is not named "em"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: EmMarkType
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "em"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          em: EmMarkType
        }
      });
    }).to.not.throw(Error);
  });
});
