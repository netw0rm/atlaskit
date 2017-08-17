import * as React from 'react';
import { MediaState } from '@atlaskit/media-core';
import { EditorView } from '../../prosemirror';
import { ErrorReportingHandler } from '../../utils/error-reporter';
import { AnalyticsHandler } from '../../analytics';

export type EditorAppearance = 'message' | 'inline-comments' | 'comments' | 'full-page' | undefined;

export interface EditorProps {
  appearance?: EditorAppearance;
  analyticsHandler?: AnalyticsHandler;

  contentComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  primaryToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  secondaryToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  addonToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];

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

  maxContentSize?: number;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
}
