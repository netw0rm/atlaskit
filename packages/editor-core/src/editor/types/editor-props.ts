import * as React from 'react';
import { MediaState } from '@atlaskit/media-core';
import { EditorView } from '../../prosemirror';
import { ErrorReportingHandler } from '../../utils/error-reporter';
import { AnalyticsHandler } from '../../analytics';

import { CollabEditProvider } from '../plugins/collab-edit';

export type EditorAppearance = 'message' | 'inline-comments' | 'comments' | 'full-page' | undefined;

export type ReactElement = React.ReactElement<any> | React.ReactElement<any>[];

export interface EditorProps {
  appearance?: EditorAppearance;
  analyticsHandler?: AnalyticsHandler;

  contentComponents?: ReactElement;
  primaryToolbarComponents?: ReactElement;
  secondaryToolbarComponents?: ReactElement;
  addonToolbarComponents?: ReactElement;

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
  collabEditProvider?: Promise<CollabEditProvider>;

  maxContentSize?: number;
  placeholder?: string;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
}
