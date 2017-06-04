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
const baseUrl = 'http://localhost:8000/docs';

const clientID = `guest-${Math.floor(Math.random() * 0xFFFFFFFF)}`;


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
              collab({ version, clientID }),
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

// const getTelePointers = (data) => {
//   const pointers: any[] = [];
//   let lastId = null;

//   data.steps.forEach((step: Step, index: number) => {
//     const clientId = data.clientIDs[index];
//     if (clientId !== lastId) {
//       const { from, to } = step as any;
//       lastId = clientId;
//       pointers.push({
//         clientId,
//         from,
//         to: to + 1 // NOTE: Seems like we need a range in order to add decorations.
//       });
//     }
//   });

//   return pointers;
// };

const deco = (from: number, to: number, clientId: string, color: string, isSelection: boolean) => {
  return Decoration.inline(from, to, { class: `telepointer color-${color} ${isSelection ? 'telepointer-selection' : 'telepointer-pointer'}` }, { pointer: { clientId } });
};

export interface SendableSelection {
  type: 'textSelection' | 'nodeSelection';
  anchor: number;
  head: number;
}

export class PluginState {
  private localVersion: number;
  private decos: DecorationSet;

  public get version() {
    return this.localVersion;
  }

  constructor(version: number = 0, decos: DecorationSet, selection?: SendableSelection | undefined) {
    this.localVersion = version;
    this.decos = decos;
  }

  apply(tr: Transaction) {
    let { version, decos } = this;
    const data = tr.getMeta('participants');

    if (data && data.participants && data.participants.version > version) {
      const { participants } = data;
      const { users } = participants;

      version = participants.version;

      let remove: any[] = [];
      let add: any[] = [];

      Object.keys(users).forEach(key => {
        const user = users[key];
        const { color, selection /*, lastActive */ } = user;
        const { anchor, head } = selection;

        if (clientID !== user.clientID) {
          remove.push(this.findPointer(user.clientID));

          const from = anchor < head ? anchor : head;
          const to = anchor >= head ? anchor : head;
          const isSelection = to - from > 0;

          add.push(deco(from - (isSelection ? 0 : 1), to, user.clientID, color, isSelection));
        }
      });

      decos = decos.remove(remove);
      decos = decos.add(tr.doc, add);
    }

    // const data = tr.getMeta('telepointers');

    // if (data) {
    //   const { pointers } = data;

    //   if (pointers) {

    //     let remove: any[] = [];
    //     let add: any[] = [];

    //     pointers.forEach(pointer => {

    //       const { from, to, clientId } = pointer as any;

    //       // TODO: Remap instead
    //       remove.push(this.findPointer(clientId));
    //       add.push(deco(from, to, clientId));

    //     });

    //     decos = decos.remove(remove);
    //     decos = decos.add(tr.doc, add);

    //     console.log('here we are', decos);
    //   }
    // }

    return new PluginState(version, decos);
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
        const sendable = getSendableSteps(newState);
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
      channel = new Channel('Demo', view, clientID);
      channel.on('error', err => console.log('error', err));
      channel.on('data', data => {
        const { state } = view;
        const version = getVersion(state);
        const participantsVersion = stateKey.getState(state).version;

        console.log('received data');

        // if (data.version > version && data.steps && data.steps.length) {
        if (data.version > version || data.participants.version > participantsVersion) { 
          const steps = data.steps && data.steps.map(s => Step.fromJSON(state.schema, s));
          const tr = steps ? receiveTransaction(state, steps, data.clientIDs) : state.tr;
          (tr as any).setMeta('participants', { participants: data.participants });
          view.dispatch(tr);
        // } else if (data.participants.version > this.getState(state).version) {
        //   console.log('new stuff');
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
