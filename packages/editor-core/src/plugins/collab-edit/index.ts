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

import {
  Channel,
  req
} from './channel';

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
  return new Promise<{ editorState: EditorState<any>, onDispatch: (tr: Transaction, view: EditorView) => void }>((resolve, reject) => {
    let { schema, plugins } = config;

    if (!collaborative) {
      resolve({
        editorState: createEditorState(undefined, schema, plugins),
        onDispatch: (tr, view) => {
          const newState = view.state.apply(tr);
          view.updateState(newState);
        }
      });
      return;
    }

    const docId = 'Demo';
    const url = `${baseUrl}/${docId}`;

    // Load the document from the server
    req(url).then(data => {
      const { doc, version } = data as any;
      plugins = [...plugins, collab({version, clientID}), ...collabPlugins(schema)];
      resolve({
        editorState: createEditorState(doc, schema, plugins),
        onDispatch: (tr, view) => {
          if (tr.steps && tr.steps.length) {
            tr.setMeta('should-send', true);
          }

          const newState = view.state.apply(tr);
          view.updateState(newState);
        }
      });
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
  if (isSelection) {
    return Decoration.inline(from, to, { class: `telepointer color-${color} ${isSelection ? 'telepointer-selection' : 'telepointer-pointer'}` }, { pointer: { clientId } });
  }

  const node = document.createElement('span');
  node.appendChild(document.createTextNode(''));
  node.className = `telepointer color-${color} telepointer-pointer`;

  return Decoration.widget(to, node, { side: 1, pointer: { clientId } });
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
        const { color, selection, lastActive, isActive } = user;
        const { anchor, head } = selection;

        if (clientID !== user.clientID) {
          const oldPointer = this.findPointer(user.clientID);
          if (oldPointer) {
            remove.push(oldPointer);
          }

          if (lastActive > now - (5 * 60 * 1000) && isActive) {
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

  return new Plugin({
    state: {
      init: PluginState.init,
      apply(tr, prevPluginState: PluginState, oldState, newState) {
        const sendable = tr.getMeta('should-send') && getSendableSteps(newState);
        const pluginState = prevPluginState.apply(tr);
        const selection = getSendableSelection(oldState, newState);

        if (channel && (sendable || selection)) {
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
      channel = new Channel(baseUrl, 'Demo', view, clientID);
      channel.on('error', err => {
        if (err.code === 409) {
          console.log('Conflict, rebase!!!');
        }
      });

      channel.on('data', (data) => {

        const { state } = view;
        const version =  getVersion(state);
        const participantsVersion = stateKey.getState(state).version;

        if (data.version > version || data.participants.version > participantsVersion) {
          const steps = data.steps && data.steps.map(s => Step.fromJSON(state.schema, s));
          const tr = steps ? receiveTransaction(state, steps, data.clientIDs) : state.tr;
          (tr as any).setMeta('participants', { participants: data.participants });
          tr.scrollIntoView();

          const newState = view.state.apply(tr);
          view.updateState(newState);
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
