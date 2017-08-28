import {
  Plugin,
  PluginKey,
  Transaction,
  Step,
  EditorView,
} from '../../../prosemirror';
import ProviderFactory from '../../../providerFactory';
import { EditorPlugin } from '../../types';
import { CollabEditProvider, AbstractCollabEditProvider } from './provider';

export {
  CollabEditProvider,
  AbstractCollabEditProvider
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

export const applyRemoteSteps = (json: any[], view: EditorView) => {
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
      providerFactory.subscribe('collabEditProvider', (name: string, provider?: Promise<CollabEditProvider>) => {
        if (provider) {
          provider.then(p => {
            collabEditProvider = p;

            // Initialize provider
            collabEditProvider
              .on('init', data => {
                const { doc, json } = data;
                if (!!doc) {
                  isReady = true;
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
                } else if (!!json) {
                  isReady = true;
                  applyRemoteSteps(json, view);
                }
              })
              .on('data', data => {
                const { json, newState } = data;
                if (!!json) {
                  applyRemoteSteps(json, view);
                } else if (!!newState) {
                  view.updateState(newState);
                }
              })
              .on('error', err => {
                // TODO: Handle errors propery (ED-2580)
              })
              .initialize(() => view.state)
            ;
          });
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
