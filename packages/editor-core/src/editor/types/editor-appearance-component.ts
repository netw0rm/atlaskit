import { EditorView } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { EventDispatcher } from '../event-dispatcher';
import { UIComponentFactory, ReactElement } from '../types';

export interface EditorAppearanceComponentProps {
  onUiReady?: (ref) => void;
  providerFactory: ProviderFactory;
  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
  contentComponents?: UIComponentFactory[];
  primaryToolbarComponents?: UIComponentFactory[];
  secondaryToolbarComponents?: UIComponentFactory[];
  customContentComponents?: ReactElement;
  customPrimaryToolbarComponents?: ReactElement;
  customSecondaryToolbarComponents?: ReactElement;
  addonToolbarComponents?: ReactElement;
}
