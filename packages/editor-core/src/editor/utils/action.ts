import { Node, Fragment } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { stateKey as mediaStateKey, MediaPluginState, SlimMediaPluginState } from '../../plugins/media';

export async function getEditorValueWithMedia(editorState?: EditorState): Promise<Node | undefined> {
  if (!editorState) {
    return;
  }

  const mediaPluginState = editorState && mediaStateKey.getState(editorState) as SlimMediaPluginState;

  if (mediaPluginState && mediaPluginState.waitForMediaUpload) {
    await mediaPluginState.waitForPendingTasks();
  }

  const doc = editorState.doc;
  const schema = editorState.schema;
  const { media } = mediaPluginState;

  if (!media || !media.length) {
    // Media items are already interlaced with the document
    return doc;
  }

  // We need to append media to the end of the document
  return schema.nodes.doc.create({}, doc.content.append(Fragment.from(
    schema.nodes.mediaGroup.create({}, media.map(identifier => schema.nodes.media.create({
      id: identifier.id,
      type: 'file',
      collection: identifier.collectionName
    })))
  )));
}

export function insertFileFromDataUrl(editorState: EditorState | undefined, url: string, fileName: string): void {
  if (!editorState) {
    return;
  }

  const mediaPluginState = mediaStateKey.getState(editorState) as MediaPluginState;
  mediaPluginState.insertFileFromDataUrl(url, fileName);
}
