import { EditorView } from '../../prosemirror';

export type EditorAppearance = 'tray' | 'mini' | 'midi' | 'maxi';

export interface EditorProps {
  appearance: EditorAppearance;
  allowTextFormatting?: boolean;
  allowMentions?: boolean;
  emojiProvider?: Promise<any>;
  mentionProvider?: Promise<any>;
  mediaProvider?: Promise<any>;
  onChange?: (editorView: EditorView) => void;
}
