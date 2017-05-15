import { Node as PMNode } from '../prosemirror';

export { default as nodeViewFactory } from './factory';
export { default as ReactEmojiNode } from './ui/emoji';
export { default as ReactMediaGroupNode } from './ui/media-group';
export { default as ReactMediaNode } from './ui/media';
export { default as ReactMentionNode } from './ui/mention';

export interface PositionedNode extends PMNode {
  getPos: () => number;
}
