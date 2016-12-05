declare module "popper.js" {
  interface State {
    offsets: {
      popper: {
        left: number;
        top: number;
      }
    }
  }

  export default class Popper {
    constructor(reference: HTMLElement, popper: HTMLElement, options: any)
    destroy(): void;
    onCreate(cb: (state: State) => void);
    onUpdate(cb: (state: State) => void);
  }
}
