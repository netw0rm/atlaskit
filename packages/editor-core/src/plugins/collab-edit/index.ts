import { EventEmitter } from 'events';

import {
  collab,
  receiveTransaction,
  sendableSteps,
  getVersion,
} from 'prosemirror-collab';

import {
  Decoration,
  DecorationSet
} from 'prosemirror-view';

import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Schema,
  Step,
  Transaction,

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

// const baseUrl = 'http://172.22.40.189:8000/docs';
const baseUrl = 'http://172.22.40.189:8080/docs';

const clientID = `guest-${Math.floor(Math.random() * 0xFFFFFFFF)}`;

export const withCollabEdit = (config) => {
  return new Promise<EditorState<any>>((resolve, reject) => {
    const docId = 'Demo';
    const url = `${baseUrl}/${docId}`;

    // Load the document from the server
    req(url).then(data => {
      let { schema, plugins } = config;
      const { doc, version } = data as any;
      plugins = [...plugins, collab({version, clientID}), ...collabPlugins(schema)];
      resolve(createEditorState(doc, schema, plugins));
    });
  });
};

export const setupEditorState = (config: any, collaborative: boolean) => {
  return new Promise<EditorState<any>>((resolve, reject) => {
    let { schema, plugins } = config;

    if (!collaborative) {
      resolve(createEditorState(undefined, schema, plugins));
      return;
    }

    const docId = 'Demo';
    const url = `${baseUrl}/${docId}`;

    // Load the document from the server
    req(url).then(data => {
      const { doc, version } = data as any;
      plugins = [...plugins, collab({version, clientID}), ...collabPlugins(schema)];
      resolve(createEditorState(doc, schema, plugins));
    });
  });
};

const createEditorState = (doc, schema, plugins) => {
  return EditorState.create(
    {
      doc: doc && schema.nodeFromJSON(doc),
      schema,
      plugins: [
        ...plugins,
      ]
    }
  );
};

class Channel {

  private eventBus = new EventEmitter();
  private docId: string;
  private view: EditorView;
  private clientID: string;

  constructor(docId: string, view: EditorView, clientID: string) {
    this.docId = docId;
    this.view = view;
    this.clientID = clientID;
    this.poll();
  }

  private poll() {
    const { state } = this.view;
    const query = `version=${getVersion(state)}&participantsVersion=${getParticipantsVersion(state)}&commentVersion=0`;
    req(`${baseUrl}/${this.docId}/events?${query}`)
      .then(data => {
        this.eventBus.emit('data', data);
        this.poll();
      })
      .catch(err => this.eventBus.emit('error', err));
  }

  send(sendable: { steps: any }, selection?: SendableSelection) {
    const { steps } = sendable || { steps: undefined };
    const { state } = this.view;
    const json = JSON.stringify({
      version: getVersion(state),
      steps: steps ? steps.steps.map(s => s.toJSON()) : [],
      clientID: this.clientID,
      selection
    });

    if (selection) {
      // console.log('sending selection', selection.anchor);
    }

    req(`${baseUrl}/${this.docId}/events`, { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } })
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
    return { steps };
  }
};

const getSendableSelection = (oldState: EditorState<any>, newState: EditorState<any>) => {
  const oldSelection = oldState.selection;
  const newSelection = newState.selection;

  if (
    oldSelection.anchor !== newSelection.anchor ||
    oldSelection.head !== newSelection.head
  ) {
    return {
      type: 'textSelection',
      anchor: newSelection.anchor,
      head: newSelection.head
    };
  }
};

export const getParticipantsVersion = (state: EditorState<any>) => {
  return stateKey.getState(state).version;
};

const deco = (from: number, to: number, clientId: string, color: string, isSelection: boolean) => {
  // if (isSelection) {
  return Decoration.inline(from, to, { class: `telepointer color-${color} ${isSelection ? 'telepointer-selection' : 'telepointer-pointer'}` }, { pointer: { clientId } });
  // }

  // const node = document.createElement('span');
  // node.className = `telepointer color-${color} telepointer-pointer`;

  // return Decoration.widget(to, node, { pointer: { clientId } });
};

export interface SendableSelection {
  type: 'textSelection' | 'nodeSelection';
  anchor: number;
  head: number;
}

export class PluginState {
  private localVersion: number;
  private localParticipants: any;
  private decos: DecorationSet;

  public get version() {
    return this.localVersion;
  }

  public get participants() {
    return this.localParticipants;
  }

  public get clientID() {
    return clientID;
  }

  constructor(version: number = 0, decos: DecorationSet, participants: any = {}) {
    this.localVersion = version;
    this.decos = decos;
    this.localParticipants = participants;
  }

  apply(tr: Transaction) {
    let { version, decos, participants } = this;
    const data = tr.getMeta('participants');

    if (data && data.participants && data.participants.version > version) {
      participants = data.participants;
      const { users } = participants;

      version = participants.version;

      let remove: any[] = [];
      let add: any[] = [];

      const now = Date.now();

      Object.keys(users).forEach(key => {
        const user = users[key];
        const { color, selection, lastActive } = user;
        const { anchor, head } = selection;

        if (clientID !== user.clientID) {
          const oldPointer = this.findPointer(user.clientID);
          if (oldPointer) {
            remove.push(oldPointer);
          }

          if (lastActive > now - (5 * 60 * 1000)) {
            let from = anchor < head ? anchor : head;
            let to = anchor >= head ? anchor : head;

            const isSelection = to - from > 0;

            add.push(deco(from - (isSelection ? 0 : 1), to, user.clientID, color, isSelection));
          }

        }
      });

      decos = decos.remove(remove);
      decos = decos.add(tr.doc, add);
    }

    return new PluginState(version, decos, participants);
  }

  private findPointer(id) {
    let current = this.decos.find();
    for (let i = 0; i < current.length; i++) {
      if (current[i].spec.pointer.clientId === id) {
        return current[i];
      }
    }
  }

  static init(config: any) {

    const { doc } = config;

    return new PluginState(0, DecorationSet.create(doc, []));
  }
}

export const stateKey = new PluginKey('collab-edit');

const plugin = (schema: Schema<any, any>, collabConfig: CollabEditConfiguration) => {

  let channel;
  let lastSentVersion = 0;

  return new Plugin({
    state: {
      init: PluginState.init,
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        const sendable = getSendableSteps(newState);
        const pluginState = prevPluginState.apply(tr);
        const selection = getSendableSelection(oldState, newState);

        if (channel && (sendable && sendable.steps.version > lastSentVersion || selection)) {
          // if (sendable) {
          //   lastSentVersion = sendable.steps.version;
          // }
          channel.send(sendable, selection);
        }

        return pluginState;
      }
    },
    props: {
      decorations(state) {
        return this.getState(state).decos;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      channel = new Channel('Demo', view, clientID);
      channel.on('error', err => console.log('error', err));
      channel.on('data', data => {
        const { state } = view;
        const version = getVersion(state);
        const participantsVersion = stateKey.getState(state).version;

        // if (data.version > version && data.steps && data.steps.length) {
        if (data.version > version || data.participants.version > participantsVersion) {
          const steps = data.steps && data.steps.map(s => Step.fromJSON(state.schema, s));
          const tr = steps ? receiveTransaction(state, steps, data.clientIDs) : state.tr;
          (tr as any).setMeta('participants', { participants: data.participants });
          tr.scrollIntoView();
          view.dispatch(tr);
          // } else if (data.participants.version > this.getState(state).version) {
          //   console.log('new stuff');
        }
      });

      return {};
    }
  });
};

const collabPlugins = (schema: Schema<any, any>, config: any = {}) => {
  return [plugin(schema, config)].filter((plugin) => !!plugin) as Plugin[];
};

export default collabPlugins;
