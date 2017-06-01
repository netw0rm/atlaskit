import { EventEmitter } from 'events';

import {
  collab,
  receiveTransaction,
  sendableSteps,
  getVersion,
} from 'prosemirror-collab';

import {
  EditorState,
  EditorView,
  Schema,
  Step,
  Transaction,
  Plugin,
  PluginKey,
} from '../../prosemirror';

export type HttpMethod = 'GET' | 'POST';

export interface RequestOptions {
  method: HttpMethod;
  body?: string;
  headers?: any;
}

export const req = (url: string, options: RequestOptions = { method: 'GET' }) => {
  return new Promise((resolve, reject) => {
    fetch(new Request(url, options))
      .then(response => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject({
            code: response.status,
            reason: response.statusText
          });
        }
      })
      .catch(reject);
  });
};

export interface CollabEditConfiguration {
  url: string;
}

export interface CollabData {
  doc: any;
  users: number;
  version: number;
}

export interface CollabAction {
  data?: CollabData;
  tr?: Transaction;
  requestDone?: boolean;
}

//const baseUrl = 'http://172.22.40.189:8000/docs'
const baseUrl = 'http://localhost:8000/docs'

export const withCollabEdit = (config) => {
  return new Promise<EditorState<any>> ((resolve, reject) => {
    const docId = 'Demo';
    const url = `${baseUrl}/${docId}`;

    // Load the document from the server
    req(url).then(data => {
      const { schema, plugins } = config;
      const { doc, version } = data as any;

      const editorState = EditorState.create(
          {
            doc: schema.nodeFromJSON(doc),
            schema,
            plugins: [
              ...plugins,
              collab({ version }),
              ...collabPlugins(schema),
            ]
          }
        );
        resolve(editorState);
    });
  });
};

class Channel {

  private eventBus = new EventEmitter();
  private docId: string;
  private view: EditorView;

  constructor(docId: string, view: EditorView) {
    this.docId = docId;
    this.view = view;
    this.poll();
  }

  private poll() {
    const { state } = this.view
    const query = `version=${getVersion(state)}&commentVersion=0`;
    req(`${baseUrl}/${this.docId}/events?${query}`)
      .then(data => {
        this.eventBus.emit('data', data)
        this.poll();
      })
      .catch(err => this.eventBus.emit('error', err));
  }

  send(sendable: { steps: any }) {
    const { steps } = sendable;
    const { state } = this.view;
    const json = JSON.stringify({
      version: getVersion(state),
      steps: steps ? steps.steps.map(s => s.toJSON()) : [],
      clientID: steps ? steps.clientID : 0,
    });

    req(`${baseUrl}/${this.docId}/events`, { method: 'POST', body: json })
      .then(data => {
        // Ignore response for now
      })
      .catch(err => this.eventBus.emit('error', err));
  }

  on(eventName: string, handler: (data: any) => void) {
    this.eventBus.on(eventName, handler);
  }

}

const getSendableSteps = (state: EditorState<any>) => {
  const steps = sendableSteps(state);
  if (steps) {
    return { steps }
  }
};

export class PluginState {
  constructor() {
    // TODO: Keep track of telepointers
  }
}

export const stateKey = new PluginKey('collab-edit');

const plugin = (schema: Schema<any, any>, collabConfig: CollabEditConfiguration) => {

  let channel;
  
  return new Plugin({
    state: {
      init(config, state: EditorState<any>) {
        return new PluginState();
      },
      apply(tr, pluginState: PluginState, oldState, newState) {
        const sendable = getSendableSteps(newState);
        if (channel && sendable) {
          channel.send(sendable);
        }

        return new PluginState();
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      channel = new Channel('Demo', view);
      channel.on('error', err => console.log('error', err));
      channel.on('data', data => {
        const { state } = view;
        const version = getVersion(state);
        if (data.version > version && data.steps && data.steps.length) {
          const steps = data.steps.map(s => Step.fromJSON(state.schema, s));
          const tr = receiveTransaction(state, steps, data.clientIDs);
          view.dispatch(tr);
        }
      });

      return { };
    }
  });
};

const collabPlugins = (schema: Schema<any, any>, config: any = {}) => {
  return [plugin(schema, config)].filter((plugin) => !!plugin) as Plugin[];
};

export default collabPlugins;
