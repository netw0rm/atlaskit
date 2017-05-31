// const {collab, receiveTransaction, sendableSteps, getVersion} = require("prosemirror-collab")

import {
  collab,
  receiveTransaction,
  sendableSteps,
  getVersion,
} from 'prosemirror-collab';

import {
  EditorState,
  EditorView,
  // Node,
  Schema,
  Step,
  // findWrapping,
  // NodeSelection,
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
  let aborted = false;

  const result = new Promise((resolve, reject) => {

    fetch(new Request(url, options))
      .then(response => {
        if (aborted) {
          return;
        }

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

  (result as any).abort = () => {
    if (!aborted) {
      aborted = true;
    }
  };

  return result;
};

export interface CollabEditConfiguration {
  url: string;
}

type CollabState = 'start' | 'loaded' | 'restart' | 'poll' | 'recover' | 'transaction' | 'send';
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

const repeat = (val: any, n: number) => {
  const result: any[] = [];
  for (let i = 0; i < n; i++) {
    result.push(val);
  }
  return result;
};

export const withCollabEdit = (config) => {
  return new Promise<EditorState<any>> ((resolve, reject) => {
    const docId = 'Demo';
    const url = `http://localhost:8000/docs/${docId}`;

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

export class CollabEditState {

  private collabState: CollabState;
  private request: Promise<any> | null = null;

  private url: string;
  private state: EditorState<any>;
  private view: EditorView;

  constructor(state: EditorState<any>, config: CollabEditConfiguration) {
    this.state = state;
    this.collabState = 'start';
    const docId = 'Demo';
    this.url = `http://localhost:8000/docs/${docId}`;
    // this.start();
    this.poll();
  }

  /*
   * Load the document from the server
   */
  // private start() {
  //   this.collabState = 'start';
  //   this.run(req(this.url))
  //     .then(data => {
  //       // Set backoff?

  //       // const { state, view } = this;

  //       // this.state = state.reconfigure({
  //       //   plugins: [
  //       //     ...state.plugins,
  //       //     collab({version: data.version})
  //       //   ]
  //       // });

  //       // view.updateState(this.state);
  //       this.dispatch('loaded', { data });
  //     });
  // }

  private run(request: Promise<any>) {
    return this.request = request;
  }

  private closeRequest() {
    (this.request as any).abort();
    this.request = null;
  }

  dispatch(collabState: CollabState, action: CollabAction) {
    const { state, view } = this;

    let newState;
    switch (collabState) {
      case 'loaded':
        if (action.data) {
          this.setDoc(action.data);
          this.poll();
        }
        break;
      case 'restart':
        // this.start();
        break;
      case 'poll':
        this.poll();
        break;
      case 'recover':
        // Do something clever..
        break;
      case 'transaction':
        // if (action.tr) {
          newState = state.apply(action.tr!);
        // }
        break;
    }

    if (newState || action.requestDone) {
      let sendable;

      if ((this.collabState === 'poll' || action.requestDone) && (sendable = this.sendableSteps(newState))) {
        this.closeRequest();
        this.send(newState, sendable);
      } else if (action.requestDone) {
        this.poll();
      }

      // Sync view with latest state
      view.updateState(newState);
    }
  }

  private poll() {
    // Polling
    this.collabState = 'poll';

    const version = getVersion(this.state);
    const query = `version=${version}&commentVersion=0`;
    this.run(req(`${this.url}/events?${query}`))
      .then(data => {
        if (data.steps && data.steps.length/* && data.version !== version*/) {
          const mmm = data.steps.map(s => Step.fromJSON(this.state.schema, s));
          const tr = receiveTransaction(this.state, mmm, data.clientIDs);
          // (tr as any).setMeta
          this.dispatch('transaction', { tr, requestDone: true });
        } else {
          this.poll();
        }
      })
      .catch(err => {
        // TODO: Error handling
        // Restart?
      });
  }

  private send(state: EditorState<any>, sendable: { steps: any }) {
    // Sending
    const { steps } = sendable;
    this.collabState = 'send';
    const json = JSON.stringify({
      version: getVersion(state),
      steps: steps ? steps.steps.map(s => s.toJSON()) : [],
      clientID: steps ? steps.clientID : 0,
    });

    this.run(req(`${this.url}/events`, { method: 'POST', body: json, /*headers: { 'Content-Type': 'application/json' }*/ }))
      .then(data => {
        const tr = steps ? receiveTransaction(this.state, steps.steps, repeat(steps.clientID, steps.steps.length)) : this.state.tr;
        // (tr as any).setMeta
        this.dispatch('transaction', { tr, requestDone: true });
      })
      .catch(err => {
        // TODO: Error handling
      });
  }

  private sendableSteps(state: EditorState<any>) {
    // Ignore first document here!
    const steps = sendableSteps(state);
    if (steps) {
      return { steps };
    }
  }

  private setDoc(data: CollabData) {
    const { state, view } = this;
    const { doc } = data;

    // Recreate state with doc and collab-plugin
    this.state = EditorState.create({
      doc: state.schema.nodeFromJSON(doc),
      schema: state.schema,
      plugins: [
        ...state.plugins,
        collab({version: data.version})
      ]
    });

    // const content: any[] = [];
    // doc.content.forEach(child => {
    //   content.push(state.schema.nodeFromJSON(child));
    // });

    // const tr = state.tr
    //   .replaceWith(0, state.doc.nodeSize - 2, state.schema.nodeFromJSON() )

    // const tr = state.tr
    //   .replaceWith(0, state.doc.nodeSize - 2, content)
    //   .scrollIntoView();

    // view.dispatch(tr);


    // this.state = this.state.reconfigure({
    //   plugins: [
    //     ...this.state.plugins,
    //     collab({version: data.version})
    //   ]
    // });

    // view.updateState(this.state);
  }

  // private setDoc(doc: Node) {
  //   const { state, view } = this;
  //   const content: any[] = [];
  //   doc.content.forEach(child => {
  //     content.push(state.schema.nodeFromJSON(child));
  //   });

  //   const tr = state.tr
  //     .replaceWith(0, state.doc.nodeSize - 2, content)
  //     .scrollIntoView();

  //   view.dispatch(tr);
  // }

  setState(newState: EditorState<any>) {
    this.state = newState;
  }

  setView(view: EditorView) {
    this.view = view;
  }
}

export const stateKey = new PluginKey('collab-edit');

const plugin = (schema: Schema<any, any>, collabConfig: CollabEditConfiguration) => {
  return new Plugin({
    state: {
      init(config, state: EditorState<any>) {
        return new CollabEditState(state, collabConfig);
      },
      apply(tr, pluginState: CollabEditState, oldState, newState) {
        pluginState.setState(newState);
        return pluginState;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      const pluginState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {
        update(view: EditorView, prevState: EditorState<any>) {
        }
      };
    }
  });
};

const collabPlugins = (schema: Schema<any, any>, config: any = {}) => {
  return [plugin(schema, config)].filter((plugin) => !!plugin) as Plugin[];
};

export default collabPlugins;
