import { EditorView } from './../../prosemirror';
import { UIComponentFactory } from './editor-plugin';
import { EventDispatcher } from '../event-dispatcher';

export interface EditorInstance {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: UIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
}
