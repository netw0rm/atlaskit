import * as popperCtor from 'popper.js';

export interface State {
  offsets: {
    popper: {
      left: number;
      top: number;
    }
  };
}

export interface IPopper {
  destroy(): void;
  onCreate(cb: (state: State) => void);
  onUpdate(cb: (state: State) => void);
  update(): void;
}

export interface IPopperConstructor {
  new (reference: HTMLElement, popper: HTMLElement, options: any): IPopper;
}

export default popperCtor as IPopperConstructor;
