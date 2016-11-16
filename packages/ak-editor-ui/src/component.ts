import { Component } from 'skatejs'

// Satisfy the React JSX TypeScript requirements so that a web
// component can be used when the React TypeScript definitions
// are loaded.
//
// The trade-off here is false advertisement and polluting of
// the web component's interface.
export default class ReactSkateComponent extends Component {
  setState: any;
  forceUpdate: any;
  state: any;
  context: any;
  refs: any;
  props: any;
  render: any;
};
