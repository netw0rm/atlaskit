import { ProseMirror } from '../';

export interface PluginStateCtor<S> {
  new(pm: ProseMirror, ...args: any[]): S;
}

export class Plugin<S> {
  constructor(state: PluginStateCtor<S>, options?: { [key: string]: any });

  get(pm: ProseMirror): S | undefined;
  attach(pm: ProseMirror): any;
  detach(pm: ProseMirror): void;
  ensure(pm: ProseMirror): S;
  config(options?: { [key: string]: any }): this;
}
