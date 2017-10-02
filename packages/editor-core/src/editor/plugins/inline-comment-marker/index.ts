import { EditorPlugin } from '../../types';
import { inlineCommentMarker } from '../../../schema/marks/inline-comment-marker';

// tslint:disable-next-line:variable-name
const inlineCommentMarkerPlugin: EditorPlugin = {
  marks() {
    return [
      { name: 'inlineCommentMarker', mark: inlineCommentMarker, rank: 190 }
    ];
  },
};

export default inlineCommentMarkerPlugin;
