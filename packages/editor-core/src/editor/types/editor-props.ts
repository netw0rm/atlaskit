import { MediaState } from '@atlaskit/media-core';
import { EditorView } from '../../prosemirror';
import { ErrorReportingHandler } from '../../utils/error-reporter';
import { AnalyticsHandler } from '../../analytics';

export type EditorAppearance = 'message' | 'inline-comments' | 'comments' | 'full-page';

export interface EditorProps {
  appearance: EditorAppearance;
  analyticsHandler?: AnalyticsHandler;

  allowTextFormatting?: boolean;
  allowMentions?: boolean;
  allowTasksAndDecisions?: boolean;
  allowHyperlinks?: boolean;
  allowCodeBlocks?: boolean;

  saveOnEnter?: boolean;

  errorReporterHandler?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;

  emojiProvider?: Promise<any>;
  mentionProvider?: Promise<any>;
  mediaProvider?: Promise<any>;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
}
