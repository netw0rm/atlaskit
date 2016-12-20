import * as module from 'popper.js';

interface State {
  offsets: {
    popper: {
      left: number;
      top: number;
    }
  }
}

export interface IPopper {
  destroy(): void;
  onCreate(cb: (state: State) => void);
  onUpdate(cb: (state: State) => void);
}

interface IPopperConstructor {
  new (reference: HTMLElement, popper: HTMLElement, options: any): IPopper;
}

const Popper: IPopperConstructor = module as any;
export default Popper;


