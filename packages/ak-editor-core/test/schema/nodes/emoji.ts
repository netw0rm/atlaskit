import { Schema, Text } from '../../../src';
import { default as chai, expect } from 'chai';
import { toHTML, fromHTML } from '../../../src';
import { DocNodeType, EmojiNodeType } from '../../../src';

describe('ak-editor-core/schema emoji node', () => {
  it('throws an error if it is not named "emoji"', () => {
    expect(() => {
      new Schema({
        nodes: {
          emoji: { type: EmojiNodeType, group: 'inline' },
          foo: { type: EmojiNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });
});
