import { EditorState, EditorView, Schema, MarkSpec, Plugin } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { EditorPlugin, EditorProps, EditorConfig } from '../types';
import {
  basePlugin,
  blockTypePlugin,
  textFormattingPlugin,
  mentionsPlugin,
  emojiPlugin
} from '../plugins';

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
  return a.rank - b.rank;
}

export function fixExcludes(marks: { [key: string]: MarkSpec }): { [key: string]: MarkSpec } {
  const markKeys = Object.keys(marks);
  markKeys.map(markKey => {
    const mark = marks[markKey];
    if (mark.excludes) {
      mark.excludes = mark.excludes
        .split(' ')
        .filter(exMarkKey => markKeys.indexOf(exMarkKey) > -1)
        .join(' ');
    }
  });
  return marks;
}

export function createPluginsList(props: EditorProps): EditorPlugin[] {
  const plugins = [basePlugin, blockTypePlugin];

  if (props.allowTextFormatting) {
    plugins.push(textFormattingPlugin);
  }

  if (props.mentionProvider) {
    plugins.push(mentionsPlugin);
  }

  if (props.emojiProvider) {
    plugins.push(emojiPlugin);
  }

  return plugins;
}

export function processPluginsList(plugins: EditorPlugin[]): EditorConfig {
  return plugins.reduce(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(...plugin.pmPlugins());
      }

      if (plugin.nodes) {
        acc.nodes.push(...plugin.nodes());
      }

      if (plugin.marks) {
        acc.marks.push(...plugin.marks());
      }

      if (plugin.contentComponent) {
        acc.contentComponents.push(plugin.contentComponent);
      }

      if (plugin.primaryToolbarComponent) {
        acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
      }

      if (plugin.secondaryToolbarComponent) {
        acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
      }

      return acc;
    },
    {
      nodes: [],
      marks: [],
      pmPlugins: [],
      contentComponents: [],
      primaryToolbarComponents: [],
      secondaryToolbarComponents: []
    } as EditorConfig
  );
}

export function createSchema(editorConfig: EditorConfig) {
  const nodes = editorConfig.nodes.sort(sortByRank).reduce((acc, node) => {
    acc[node.name] = node.node;
    return acc;
  }, {});

  const marks = fixExcludes(
    editorConfig.marks.sort(sortByRank).reduce((acc, mark) => {
      acc[mark.name] = mark.mark;
      return acc;
    }, {})
  );

  return new Schema({ nodes, marks });
}

export function createPMPlugins(
  editorConfig: EditorConfig,
  schema: Schema<any, any>,
  providerFactory: ProviderFactory
): Plugin[] {
  return editorConfig.pmPlugins
    .sort(sortByRank)
    .map(plugin => plugin.plugin(schema, providerFactory))
    .filter(plugin => !!plugin) as Plugin[];
}

export default function createEditor(place: HTMLElement, props: EditorProps, providerFactory: ProviderFactory) {
  const editorConfig = processPluginsList(createPluginsList(props));
  const { contentComponents, primaryToolbarComponents, secondaryToolbarComponents } = editorConfig;

  const schema = createSchema(editorConfig);
  const plugins = createPMPlugins(editorConfig, schema, providerFactory);
  const state = EditorState.create({ schema, plugins });
  const editorView = new EditorView(place, {
    state,
    dispatchTransaction: tr => {
      const newState = editorView.state.apply(tr);
      editorView.updateState(newState);

      if (props.onChange) {
        props.onChange(editorView);
      }
    }
  });

  return {
    editorView,
    contentComponents,
    primaryToolbarComponents,
    secondaryToolbarComponents
  };
}
