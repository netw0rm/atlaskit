import { EditorProps, EditorAppearance } from '../types';

const messageEditorPropsPreset: EditorProps = {
  appearance: 'message',

  saveOnEnter: true,

  allowTextFormatting: true,
  allowLists: true,
  allowTextColor: true,
  allowHyperlinks: true,
  allowCodeBlocks: true,
  allowTasksAndDecisions: true,
  allowHelpDialog: true
};

const commentEditorPropsPreset: EditorProps = {
  appearance: 'comment',

  allowCodeBlocks: true,
  allowHyperlinks: true,
  allowLists: true,
  allowMentions: true,
  allowTables: true,
  allowTextColor: true,
  allowTextFormatting: true,
};

export default function getPropsPreset(appearance: EditorAppearance): EditorProps {
  switch (appearance) {
    case 'message':
      return { ...messageEditorPropsPreset };
    case 'comment':
      return { ...commentEditorPropsPreset };
    default:
      return {};
  }
}
