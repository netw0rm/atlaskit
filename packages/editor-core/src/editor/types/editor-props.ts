import * as React from 'react';
import { MediaState } from '@atlaskit/media-core';
import { ActivityProvider } from '@atlaskit/activity';
import { EditorView, Node, Schema } from '../../prosemirror';
import { ErrorReportingHandler } from '../../utils/error-reporter';
import { AnalyticsHandler } from '../../analytics';
import { CollabEditProvider } from '../plugins/collab-edit';
import { MacroProvider } from '../plugins/macro/types';
import { Transformer } from '../../';

export type EditorAppearance = 'message' | 'inline-comment' | 'comment' | 'full-page' | 'chromeless' | undefined;

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
  allowHelpDialog?: boolean;
  allowJiraIssue?: boolean;
  allowUnsupportedContent?: boolean;
  allowInlineCommentMarker?: boolean;
  allowPanel?: boolean;
  allowInlineMacro?: boolean;

  saveOnEnter?: boolean;
  shouldFocus?: boolean;

  errorReporterHandler?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;

  activityProvider?: Promise<ActivityProvider>;
  collabEditProvider?: Promise<CollabEditProvider>;
  presenceProvider?: Promise<any>;
  emojiProvider?: Promise<any>;
  mentionProvider?: Promise<any>;
  mediaProvider?: Promise<any>;
  macroProvider?: Promise<MacroProvider>;
  waitForMediaUpload?: boolean;
  contentTransformerProvider?: (schema: Schema<any, any>) => Transformer<string>;

  maxHeight?: number;
  maxContentSize?: number;
  placeholder?: string;
  defaultValue?: Node | string | Object;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
  onCancel?: (editorView: EditorView) => void;
  onExpand?: (editorView: EditorView) => void;
}
