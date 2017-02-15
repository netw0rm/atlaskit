// // @flow
// // eslint-disable no-duplicate-imports
// import { PureComponent } from 'react';
// import type { React$Element } from 'react';
// import redux from 'redux';
// import type { Store } from 'redux';
// import reducer from '../state/reducer';

// type Props = {
//   children: React$Element,
// }

// type Context = {
//   dragDropStore: Store
// }

// export default class DragDropContext extends PureComponent {
//   childContextTypes: Context
//   getChildContext() {
//     return {
//       dragDropStore: this.store,
//     };
//   }
//   props: Props
//   store: Store

//   constructor(props: Props, context: any) {
//     super(props, context);

//     this.store = redux.createStore(reducer);
//   }

//   render() {
//     return this.props.children;
//   }
// }
