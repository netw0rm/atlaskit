import { EditorView } from './../../prosemirror';
import { UIComponentFactory } from './editor-plugin';
import { EventDispatcher } from '../event-dispatcher';
import { Transformer } from '../../transformers';

export interface EditorInstance {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: UIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
  transformer?: Transformer<string>;
}
