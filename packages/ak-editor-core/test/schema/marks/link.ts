import * as chai from 'chai';
import { expect } from 'chai';
import { Node, Schema, Text, DocNodeType, LinkMarkType } from '../../../src';
import { fromHTML, toHTML, chaiPlugin } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema link mark', () => {
  it('throws an error if it is not named "link"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: LinkMarkType
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "link"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          link: LinkMarkType
        }
      });
    }).to.not.throw(Error);
  });
});