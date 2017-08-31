import {
  Plugin,
  PluginKey,
  Transaction,
  Step,
  EditorView,
  EditorState,
} from '../../../prosemirror';
import ProviderFactory from '../../../providerFactory';
import { EditorPlugin } from '../../types';
import { CollabEditProvider } from './provider';

export {
  CollabEditProvider,
};

export const pluginKey = new PluginKey('collabEditPlugin');

// TODO: Keep track of telepointers and participants here (ED-2574)
class PluginState {
  apply(tr: Transaction) {
    return new PluginState();
  }

  static init(config: any) {
    return new PluginState();
  }
}

const handleInit = (data: { doc?: any, json?: any }, view: EditorView) => {
  const { doc, json } = data;
  if (doc) {
    const { state, state: { schema, tr } } = view;
    const content = (doc.content || []).map(child => schema.nodeFromJSON(child));

    if (content.length) {
      const newState = state.apply(
        tr
          .setMeta('addToHistory', false)
          .replaceWith(0, state.doc.nodeSize - 2, content)
          .scrollIntoView()
      );
      view.updateState(newState);
    }
  } else if (json) {
    applyRemoteSteps(json, view);
  }
};

 const applyRemoteData = (data: { json?: any, newState?: EditorState<any> }, view: EditorView) => {
  const { json, newState } = data;
  if (json) {
    applyRemoteSteps(json, view);
  } else if (newState) {
    view.updateState(newState);
  }
};

const applyRemoteSteps = (json: any[], view: EditorView) => {
  const { state, state: { schema } } = view;
  let { tr } = state;

  json.forEach(stepJson => {
    const step = Step.fromJSON(schema, stepJson);
    tr.step(step);
  });

  tr.setMeta('addToHistory', false);
  tr.scrollIntoView();
  const newState = state.apply(tr);
  view.updateState(newState);
};

export const createPlugin = (providerFactory: ProviderFactory) => {

  let collabEditProvider: CollabEditProvider | null;
  let isReady = false;

  return new Plugin({
    key: pluginKey,
    state: {
      init: PluginState.init,
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        if (tr.getMeta('isLocal')) {
          if (collabEditProvider) {
            collabEditProvider.send(tr, oldState, newState);
          }
        }

        const pluginState = prevPluginState.apply(tr);
        return pluginState;
      },
    },
    filterTransaction(tr, state) {
      if (!isReady) {
        return false;
      }

      return true;
    },
    view(view) {
      providerFactory.subscribe('collabEditProvider', async (name: string, providerPromise?: Promise<CollabEditProvider>) => {
        if (providerPromise) {
          collabEditProvider = await providerPromise;

          // Initialize provider
          collabEditProvider
            .on('init', data => { isReady = true; handleInit(data, view); })
            .on('data', data => applyRemoteData(data, view))
            .on('error', err => {
              // TODO: Handle errors propery (ED-2580)
            })
            .initialize(() => view.state)
          ;
        } else {
          collabEditProvider = null;
          isReady = false;
        }
      });

      return {
        destroy() {
          providerFactory.unsubscribeAll('collabEditProvider');
          collabEditProvider = null;
        }
      };

    }
  });
};

const collabEditPlugin: EditorPlugin = {

  pmPlugins() {
    return [
      { rank: 1000, plugin: (schema, props, dispatch, providerFactory) => createPlugin(providerFactory) }
    ];
  }

};

export default collabEditPlugin;
