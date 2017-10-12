import { EditorPlugin } from '../../types';
import { confluenceInlineComment } from './../../../schema/marks/confluence-inline-comment';

// tslint:disable-next-line:variable-name
const confluenceInlineCommentPlugin: EditorPlugin = {
  marks() {
    return [
      { name: 'confluenceInlineCommentPlugin', mark: confluenceInlineComment, rank: 190 }
    ];
  },
};

export default confluenceInlineCommentPlugin;
