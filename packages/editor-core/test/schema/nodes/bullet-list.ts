import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { BulletListNodeType, DocNodeType } from '../../../src';

describe('@atlaskit/editor-core/schema bullet_list node', () => {
  it('throws an error if it is not named "bullet_list"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          foo: { type: BulletListNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "bullet_list"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          bullet_list: { type: BulletListNodeType, content: 'text*' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });
});
