import * as React from 'react';
import { EditorView } from '../../prosemirror';

export interface EditorAppearanceComponentProps {
  onUiReady?: (ref) => void;
  editorView?: EditorView;
  contentComponents?: React.ReactElement<any>[];
  primaryToolbarComponents?: React.ReactElement<any>[];
  secondaryToolbarComponents?: React.ReactElement<any>[];
}
