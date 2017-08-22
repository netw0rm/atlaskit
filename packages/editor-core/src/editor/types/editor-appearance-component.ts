import * as React from 'react';
import { EditorView } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { EventDispatcher } from '../event-dispatcher';

export interface EditorAppearanceComponentProps {
  onUiReady?: (ref) => void;
  providerFactory: ProviderFactory;
  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
  contentComponents?: React.ReactElement<any>[];
  primaryToolbarComponents?: React.ReactElement<any>[];
  secondaryToolbarComponents?: React.ReactElement<any>[];
}
