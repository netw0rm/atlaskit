import { analyticsService, AnalyticsHandler } from '../../analytics';
import { EditorState, EditorView, Node, Schema, MarkSpec, Plugin, Transaction } from '../../prosemirror';
import { EditorInstance, EditorPlugin, EditorProps, EditorConfig } from '../types';
import ProviderFactory from '../../providerFactory';
import ErrorReporter from '../../utils/error-reporter';
import { EventDispatcher, createDispatch, Dispatch } from '../event-dispatcher';

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
  props: EditorProps,
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  errorReporter: ErrorReporter
): Plugin[] {
  return editorConfig.pmPlugins
    .sort(sortByRank)
    .map(({ plugin }) => plugin(schema, props, dispatch, providerFactory, errorReporter))
    .filter(plugin => !!plugin) as Plugin[];
}

export function createErrorReporter(errorReporterHandler) {
  const errorReporter = new ErrorReporter();
  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler;
  }
  return errorReporter;
}

export function initAnalytics(analyticsHandler?: AnalyticsHandler) {
  analyticsService.handler = analyticsHandler || (() => {});
  analyticsService.trackEvent('atlassian.editor.start');
}

export function processDefaultDocument(schema: Schema<any, any>, rawDoc?: Node | string | Object): Node | undefined {
  if (!rawDoc) {
    return;
  }

  if (rawDoc instanceof Node) {
    return rawDoc;
  }

  let doc: Object;
  if (typeof rawDoc === 'string') {
    try {
      doc = JSON.parse(rawDoc);
    } catch (e) {
      console.error(`Error processing default value: ${rawDoc} isn't valid JSON document`);
      return;
    }
  } else {
    doc = rawDoc;
  }

  if (Array.isArray(doc)) {
    console.error(`Error processing default value: ${doc} is an array, but it must be an object with the following shape { type: 'doc', content: [...] }`);
    return;
  }

  try {
    return Node.fromJSON(schema, doc);
  } catch (e) {
    console.error(`Error processing default value: ${doc} – ${e.message}`);
    return;
  }
}

/**
 * Creates and mounts EditorView to the provided place.
 */
export default function createEditor(
  place: HTMLElement | null,
  editorPlugins: EditorPlugin[] = [],
  props: EditorProps,
  providerFactory: ProviderFactory
): EditorInstance {
  const editorConfig = processPluginsList(editorPlugins);
  const { contentComponents, primaryToolbarComponents, secondaryToolbarComponents } = editorConfig;
  const { transformerProvider, defaultValue } = props;
  let doc;
  let transformer;

  initAnalytics(props.analyticsHandler);

  const errorReporter = createErrorReporter(props.errorReporterHandler);
  const eventDispatcher = new EventDispatcher();
  const dispatch = createDispatch(eventDispatcher);
  const schema = createSchema(editorConfig);
  const plugins = createPMPlugins(editorConfig, schema, props, dispatch, providerFactory, errorReporter);

  if (transformerProvider && typeof defaultValue === 'string') {
    transformer = transformerProvider(schema);
    doc = transformer.parse(defaultValue);
  } else {
    doc = processDefaultDocument(schema, defaultValue);
  }

  const state = EditorState.create({ doc, schema, plugins });
  const editorView = new EditorView(place, {
    state,
    dispatchTransaction(tr: Transaction) {
      tr.setMeta('isLocal', true);
      const newState = editorView.state.apply(tr);
      editorView.updateState(newState);
    }
  });

  return {
    editorView,
    eventDispatcher,
    contentComponents,
    primaryToolbarComponents,
    secondaryToolbarComponents,
    transformer
  };
}
