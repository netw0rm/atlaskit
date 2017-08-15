import { EditorView } from './../../prosemirror';
import { UIComponentFactory } from './editor-plugin';
import { EventDispatcher } from '../event-dispatcher';
import EditorActions from '../actions';

export interface EditorInstance {
  editorView: EditorView;
  editorActions: EditorActions;
  eventDispatcher: EventDispatcher;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: UIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
}
