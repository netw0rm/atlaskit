import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { DocNodeType, HardBreakNodeType } from '../../../src';

describe('@atlaskit/editor-core/schema hard_break node', () => {
  it('throws an error if it is not named "hard_break"', () => {
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

  it('does not throw an error if it is named "hard_break"', () => {
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
