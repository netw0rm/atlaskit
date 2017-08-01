import { EditorPlugin, EditorProps } from '../types';
import {
  basePlugin,
  analyticsPastePlugin,
  blockTypePlugin,
  textFormattingPlugin,
  mentionsPlugin,
  emojiPlugin,
  tasksAndDecisionsPlugin,
  saveOnEnterPlugin,
  onChangePlugin,
  mediaPlugin,
  maxContentSizePlugin,
  hyperlinkPlugin,
  codeBlockPlugin
} from '../plugins';

/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export function getDefaultPluginsList(): EditorPlugin[] {
  return [analyticsPastePlugin, basePlugin, blockTypePlugin];
}

/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(props: EditorProps): EditorPlugin[] {
  const plugins = getDefaultPluginsList();

  if (props.allowTextFormatting) {
    plugins.push(textFormattingPlugin);
  }

  if (props.allowHyperlinks) {
    plugins.push(hyperlinkPlugin);
  }

  if (props.allowCodeBlocks) {
    plugins.push(codeBlockPlugin);
  }

  if (props.mentionProvider) {
    plugins.push(mentionsPlugin);
  }

  if (props.emojiProvider) {
    plugins.push(emojiPlugin);
  }

  if (props.allowTasksAndDecisions) {
    plugins.push(tasksAndDecisionsPlugin);
  }

  if (props.saveOnEnter) {
    plugins.push(saveOnEnterPlugin);
  }

  if (props.onChange) {
    plugins.push(onChangePlugin);
  }

  if (props.mediaProvider) {
    plugins.push(mediaPlugin);
  }

  if(props.maxContentSize) {
    plugins.push(maxContentSizePlugin);
  }

  return plugins;
}
