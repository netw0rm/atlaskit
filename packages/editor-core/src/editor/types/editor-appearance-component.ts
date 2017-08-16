import * as React from 'react';
import { EditorView } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { EventDispatcher } from '../event-dispatcher';
import { UIComponentFactory } from '../types';

export interface EditorAppearanceComponentProps {
  onUiReady?: (ref) => void;
  providerFactory: ProviderFactory;
  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
  contentComponents?: UIComponentFactory[];
  primaryToolbarComponents?: UIComponentFactory[];
  secondaryToolbarComponents?: UIComponentFactory[];
  customContentComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  customPrimaryToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];
  customSecondaryToolbarComponents?: React.ReactElement<any> | React.ReactElement<any>[];
}
