import BlockquoteSerializer from './blockquote';
import HardBreakSerializer from './hard-break';
import ImageSerializer from './image';
import ListItemSerializer from './list-item';
import MediaSerializer from './media';
import MentionSerializer from './mention';
import RuleSerializer from './rule';

/*
 * If you need a special behaviour for node serialization specify
 * your function here like "mediaGroup: (PMNode) => string"
 */
export default {
  blockquote: BlockquoteSerializer,
  hardBreak: HardBreakSerializer,
  image: ImageSerializer,
  listItem: ListItemSerializer,
  media: MediaSerializer,
  mention: MentionSerializer,
  rule: RuleSerializer,
};
