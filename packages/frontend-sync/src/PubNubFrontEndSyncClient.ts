import * as PubNub from 'pubnub';
import * as EventEmitter from 'event-emitter';

import {
  Channel,
  FrontEndSyncClient,
  FrontEndSyncClientConfig,
  FrontEndSyncEventEmitter,
  Message,
  OnEvent
} from './types';

export class PubNubFrontEndSyncEventEmitter implements FrontEndSyncEventEmitter {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = EventEmitter();
  }

  emit(event: string, data: any): FrontEndSyncEventEmitter {
    this.emitter.emit(event, event, data);
    return this;
  }

  on(event: string, listener: OnEvent): FrontEndSyncEventEmitter {
    this.emitter.on(event, listener);

    return this;
  }

  off(event: string, listener: OnEvent): FrontEndSyncEventEmitter {
    this.emitter.off(event, listener);

    return this;
  }
}


export class PubNubFrontEndSyncClient implements FrontEndSyncClient {

  private pubNub: PubNub;
  private config: FrontEndSyncClientConfig;
  private emitter: FrontEndSyncEventEmitter;

  private currentChannels: Channel[];

  constructor(config: FrontEndSyncClientConfig, emitter: FrontEndSyncEventEmitter) {
    this.pubNub = null;
    this.config = config;
    this.emitter = emitter;

    this.currentChannels = [];
  }

  join(channels: Channel[]) : FrontEndSyncClient {
    this.joinRemote(channels).then((data) => {
      this.currentChannels = channels;

      if (!this.isPubNubClientInitialized()) {
        this.pubNub = new PubNub({
          subscribeKey: data.subscribeKey
        });

        this.pubNub.addListener({
          status: (statusEvent) => this.onStatus(statusEvent),
          message: (message) => this.onMessage(message)
        });
      }

      this.pubNub.setAuthKey(data.authKey);

      const pubNubChannelNames = Object.keys(data.channelNames).map(e => data.channelNames[e]);
      this.pubNub.subscribe({
        channels: pubNubChannelNames
      });

    });

    return this;
  }

  leave(channels: Channel[]) : FrontEndSyncClient {

    // this.currentChannels.filter
    return this;
  }

  private onStatus(status: PubNubStatus) {
    if (status.category === 'PNAccessDeniedCategory') {
      this.join(this.currentChannels);
    }
  }

  private onMessage(pubNubMessage: PubNubMessage) {
    const message = pubNubMessage.message;
    if (message) {
      // dispatch message to listeners
      this.emitter.emit(message.type, message.payload);
    }
  }

  private isPubNubClientInitialized(): boolean {
    return this.pubNub !== null;
  }

  private joinRemote(channels: Channel[]) {
    const request = new Request(this.config.url + '/sync/join', {
      method: 'POST',
      body: JSON.stringify(channels),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im1pY3Jvcy9lZGdlLWF1dGhlbnRpY2F0b3IvamhvYXJhdTIwMTcwODI4In0.eyJqdGkiOiJmZGZiMjYxNy1iNDk1LTQ4NjQtNzI4My0yZmU0YTc3OGVjODQiLCJpYXQiOjE1MTIzNTIzNjQsImV4cCI6MTUxMjM1NTg3NCwiYWNjb3VudElkIjoiNjU1MzYyOjQ3NDZiMGI3LTA3ZGYtNGI4Yi1hNGRjLTU3ZWFiMGU0OGYyZCIsImlzcyI6Im1pY3Jvcy9lZGdlLWF1dGhlbnRpY2F0b3IiLCJzdWIiOiJtaWNyb3MvZWRnZS1hdXRoZW50aWNhdG9yIiwiYXVkIjoicGYtbWVudGlvbnMtc2VydmljZSJ9.liDOUUKVM0DsQfBV4QcYs6gvNvxJ_H7kYQzxyCm6o4NcPlvQrLzDXdj8T0qTUfszS4FeKbVE1uYKNkZ0Bwgnu31AJpB-xvITijblEo3wWO1f92W5ZX_l8SZFC1LZOyOrOjs53xgg_M9wttJiWEuvyADWRjkg6bFDJpfhkph27d8ibrpkl4mBoxBzKJbVbs5Htnp1NvId6GBZIlRaWpOcTVfwdEZlVGXjmZ0-2NE7puOOLDwU-d-cwyluaZjD86c5IS_VYJXgIQq4kQMxj6XwHeTMiunV_1bzjEtCTqAExKE4_FAu_r7OXbILlt0thNPnbalj3PMhH2RUaUpip-6TcQ'
      }
    });

    return fetch(request).then(response => {
      if (response.status === 403) {
        //
      } else if (response.ok) {
        return response.json();
      }

      throw new Error(`Unable to load media image. Status=${response.status} ${response.statusText}`);
    });

  }
}

export interface PubNubMessage {
  actualChannel: string;
  channel: string;
  publisher: string;
  subscribedChannel: string;
  channelGroup: string;
  timetoken: string;
  message: Message;
}

interface PubNubStatus {
  category: PubNubCategory;
  operation: PubNubOperation;
  affectedChannels: string[];
  subscribedChannels: string[];
  affectedChannelGroups: string[];
  lastTimeToken: number;
  currentTimeToken: number;
}

type PubNubCategory =
  "PNNetworkUpCategory" |
  "PNNetworkDownCategory" |
  "PNNetworkIssuesCategory" |
  "PNReconnectedCategory" |
  "PNAccessDeniedCategory" |
  "PNMalformedResponseCategory" |
  "PNBadRequestCategory" |
  "PNDecryptionErrorCategory" |
  "PNTimeoutCategory";

type PubNubOperation =
  "PNSubscribeOperation" |
  "PNPublishOperation";
