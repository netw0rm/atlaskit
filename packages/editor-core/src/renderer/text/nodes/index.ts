import BlockquoteSerializer from './blockquote';
import MediaSerializer from './media';

/*
 * If you need a special behaviour for node serialization specify
 * your function here like "mediaGroup: (PMNode) => string"
 */
export default {
  blockquote: BlockquoteSerializer,
  media: MediaSerializer,
};
