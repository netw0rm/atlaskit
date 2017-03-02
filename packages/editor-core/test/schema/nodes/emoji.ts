import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { DocNodeType, EmojiNodeType } from '../../../src';

describe('@atlaskit/editor-core/schema emoji node', () => {
  it('throws an error if it is not named "emoji"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          foo: { type: EmojiNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "emoji"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          emoji: { type: EmojiNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });
});
