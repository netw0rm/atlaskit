import { EventEmitter } from 'events';
import { getVersion } from 'prosemirror-collab';
import {
  EditorState,
  EditorView,
} from '../../prosemirror';

import {
  SendableSelection,
  stateKey
} from './';

import * as io from 'socket.io-client';

export const getParticipantsVersion = (state: EditorState<any>) => {
  return stateKey.getState(state).version;
};

export class Channel {
  private eventBus = new EventEmitter();
  private docId: string;
  private view: EditorView;
  private clientID: string;

  private isSending: boolean = false;
  private baseUrl: string;

  private io: io;

  constructor(baseUrl: string, docId: string, view: EditorView, clientID: string) {
    this.baseUrl = baseUrl;
    this.docId = docId;
    this.view = view;
    this.clientID = clientID;
    // this.poll();

    this.setupSocket();
  }

  private setupSocket() {
    this.io = io.connect(`http://172.22.40.189:8080/docs/${this.docId}`);
    this.io.on('connect', () => {
      console.log('connected!');
      this.io.emit('join', this.clientID);
    });

    this.io.on('events', (data) => {
      this.eventBus.emit('data', data);
      // console.log('received data', data);
    });
  }

  // private poll() {
  //   const { state } = this.view;
  //   const version = getVersion(state);
  //   const query = `version=${version}&participantsVersion=${getParticipantsVersion(state)}&commentVersion=0`;
  //   req(`${this.baseUrl}/${this.docId}/events?${query}`)
  //     .then(data => {
  //       this.eventBus.emit('data', data, version);
  //       this.poll();
  //     })
  //     .catch(err => this.eventBus.emit('error', err));
  // }

  send(sendable: { steps: any }, selection?: SendableSelection) {
    const { steps } = sendable || { steps: undefined };
    const { state } = this.view;
    const version = getVersion(state);
    const json = JSON.stringify({
      version: version,
      steps: steps ? steps.steps.map(s => s.toJSON()) : [],
      clientID: this.clientID,
      selection
    });

    const hasSteps = steps && steps.length;

    // If we're sending new steps - wait for current POST to finish.
    if (this.isSending && hasSteps) {
      return;
    }

    this.isSending = hasSteps;
    if (hasSteps) {
      console.log('sending steps', steps);
    }

    if (selection) {
      console.log('sending selection', selection.anchor);
    }

    req(`${this.baseUrl}/${this.docId}/events`, { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } })
      .then(data => {
        // Ignore response.
        this.isSending = false;
      })
      .catch(err => {
        this.isSending = false;
        this.eventBus.emit('error', err);
      });
  }

  on(eventName: string, handler: (data: any) => void) {
    this.eventBus.on(eventName, handler);
  }
}

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
