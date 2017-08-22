import {
  Plugin,
  PluginKey,
  Transaction,
  EditorState,
  Step,
} from '../../../prosemirror';
import ProviderFactory from '../../../providerFactory';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('collabEditPlugin');

// TODO: Keep track of telepointers and participants here
class PluginState {
  apply(tr: Transaction) {
    return new PluginState();
  }

  static init(config: any) {
    return new PluginState();
  }
}

// TODO: Move this interface somewhere..
export interface CollabEditProvider {
  initialize(getDoc: () => any): Promise<any>;
  send(tr: Transaction, oldState: EditorState<any>, newState: EditorState<any>): void;
  on(evt: 'data' | 'error', handler: (...args) => void);
}

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
              .initialize(() => view.state.doc.toJSON())
              .then(doc => {
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
              });

            collabEditProvider.on('data', data => {
              const { json } = data;
              if (json) {
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
              }
            });

            collabEditProvider.on('error', err => {
              // TODO: Handle errors propery
            });
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
