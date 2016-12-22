import { Schema, Text } from '../../../src';
import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, HardBreakNodeType } from '../../../src';

describe('ak-editor-core/schema heading node', () => {
  it('throws an error if it is not named "heading{1..5}"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: HardBreakNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  [1, 2, 3, 4, 5].forEach((level) => {
    it(`does not throw an error if it is named "heading${level}"`, () => {
      expect(() => {
        new Schema({
          nodes: {
            doc: { type: DocNodeType, content: 'text*' },
            hard_break: { type: HardBreakNodeType, content: 'text*' },
            text: { type: Text }
          }
        });
      }).to.not.throw(Error);
    });
  });

});
