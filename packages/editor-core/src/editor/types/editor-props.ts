import * as React from 'react';
import { MediaState } from '@atlaskit/media-core';
import { EditorView } from '../../prosemirror';
import { ErrorReportingHandler } from '../../utils/error-reporter';
import { AnalyticsHandler } from '../../analytics';

export type EditorAppearance = 'message' | 'inline-comments' | 'comments' | 'full-page' | undefined;

export interface EditorProps {
  appearance?: EditorAppearance;
  analyticsHandler?: AnalyticsHandler;

  primaryToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  secondaryToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  contentComponents?: React.ReactElement<any> | React.ReactElement<any>[];

  allowTextFormatting?: boolean;
  allowMentions?: boolean;
  allowTasksAndDecisions?: boolean;
  allowHyperlinks?: boolean;
  allowCodeBlocks?: boolean;
  allowLists?: boolean;
  allowTextColor?: boolean;
  allowTables?: boolean;

  saveOnEnter?: boolean;
  shouldFocus?: boolean;

  errorReporterHandler?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;

  emojiProvider?: Promise<any>;
  mentionProvider?: Promise<any>;
  mediaProvider?: Promise<any>;

  maxContentSize?: number;
  placeholder?: string;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
}
