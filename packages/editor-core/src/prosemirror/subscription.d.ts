export class Subscription<T> {
  add(f: T, priority?: number): void;
  addOnce(f: T, priority?: number): void;
  remove(f: T): void;
  hasHandler(): boolean;
  dispatch(...args: any[]): void;
}

export class PipelineSubscription<T> extends Subscription<T> {
  dispatch(value: any): any;
}

export class StoppableSubscription<T> extends Subscription<T> {
  dispatch(...args: any[]): any;
}

export class DOMSubscription<T> extends Subscription<T> {
  dispatch(event: Event): boolean;
}
