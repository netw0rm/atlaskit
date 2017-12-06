export interface OnEvent<T = any> {
  (event: string, data: T): void;
}

export interface FrontEndSyncEventListener {
  on(event: string, listener: OnEvent): FrontEndSyncEventEmitter;
  off(event: string, listener: OnEvent): FrontEndSyncEventEmitter;
}

export interface FrontEndSyncEventEmitter extends FrontEndSyncEventListener {
  emit(event: string, data: any): FrontEndSyncEventEmitter;
}

export type Channel = ContainerChannel | UserChannel;

export class ContainerChannel {
  private containerAri: string;

  constructor(containerAri: string) {
    this.containerAri = containerAri;
  }

  getType(): string {
    return "CONTAINER";
  }

  getContainerAri(): string {
    return this.containerAri;
  }
}

export default class UserChannel {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  getType(): string {
    return "USER";
  }

  getUserId(): string {
    return this.userId;
  }
}

export interface Message<T = any> {
  type: string;
  time: number;
  payload: T
}

export interface FrontEndSyncClientConfig {
  url: string;
}

export interface FrontEndSyncClient {
  join(channels: Channel[]) : FrontEndSyncClient;
  leave(channels: Channel[]) : FrontEndSyncClient;
}
