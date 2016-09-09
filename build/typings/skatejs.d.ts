declare module "skatejs" {
  export const vdom: any;
  export const props: any;
  export const emit: any;
  export const define: any;

  interface Symbols {
    shadowRoot: string;
  }

  export const symbols: Symbols;
  export const prop: any;
  class Component extends HTMLElement {}
}
