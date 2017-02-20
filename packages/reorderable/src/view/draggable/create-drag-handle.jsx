// // @flow
// import { cloneElement } from 'react';
// import invariant from 'invariant';
// import type { Position } from '../../state/types';

// // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
// export const primaryClick = 0;

// const threshold: number = 10;

// export default (onLift: (point: Position) => void,
//   onMove: (point: Position) => void,
//   onDrop: (point: Position) => void,
//   onCancel: () => void
// ) => (el: React$Element<*>) => {
//   // const pendingIntial: ?Position = null;
//   let areMouseEventsBound: boolean = false;

//   const bindWindowMouseEvents = () => {
//     invariant(!areMouseEventsBound, 'mouse events are already bound');
//     console.log('binding mouse events');

//     window.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('mouseup', onMouseUp);

//     areMouseEventsBound = true;
//   };

//   const unbindWindowMouseEvents = () => {
//     invariant(areMouseEventsBound, 'there are no mouse events bound');
//     console.log('unbinding mouse events');

//     window.removeEventListener('mousemove', onMouseMove);
//     window.removeEventListener('mouseup', onMouseUp);

//     areMouseEventsBound = false;
//   };

//   const onKeyUp = (event) => {
//     // state = {
//     //   initial: point,
//     //   isWaitingForThreshold: false,
//     // };

//     // onLift();
//   };

//   const onMouseMove = (event) => {
//     const { button, clientX, clientY } = event;

//     if (button !== primaryClick) {
//       return;
//     }

//     const point: Position = {
//       x: clientX,
//       y: clientY,
//     };

//     onMove(point);
//   };

//   const onMouseUp = (event: SyntheticMouseEvent): void => {
//     const { button, clientX, clientY } = event;

//     if (button !== primaryClick) {
//       return;
//     }

//     const point: Position = {
//       x: clientX,
//       y: clientY,
//     };

//     unbindWindowMouseEvents();
//     onDrop(point);
//   };

//   const onMouseDown = (event) => {
//     const { button, clientX, clientY } = event;

//     if (button !== primaryClick) {
//       return;
//     }

//     const point: Position = {
//       x: clientX,
//       y: clientY,
//     };

//     bindWindowMouseEvents();
//     // todo: sloppy clicks
//     onLift(point);
//   };

//   // class Temp extends PureComponent {
//   //   componentDidMount() {
//   //     this.addEvent('onClick', this._onClick) // will also auto-remove on unmount
//   //   }

//   //   render() {
//   //     return React.Children.only(this.props.children)
//   //   }
//   // }

//   // TODO: need to kill handlers on unmount
//   // investigate using a component

//   return cloneElement(el, {
//     tabIndex: '0',
//     onKeyUp,
//     onMouseDown,
//   });
// };

// // let ref = null;

// //   console.info('get drag handled called');

// //   const onMouseDown = () => console.log('onmousedown');

// //   const attachListeners = (target: Node): void => {
// //     console.log('adding listeners');
// //     target.addEventListener('click', onMouseDown);
// //   };

// //   const removeListeners = (target: Node): void => {
// //     console.log('removing listeners');
// //     target.removeEventListener('click', onMouseDown);
// //   };

// //   // React will call the ref callback with the DOM element when the component mounts,
// //   // and call it with null when it unmounts.
// //   const setRef = (newRef: ?Node) => {
// //     // is unmounting
// //     if (ref && !newRef) {
// //       removeListeners(ref);
// //       ref = null;
// //       return;
// //     }

// //     if (!newRef) {
// //       throw new Error('setRef called with null without a mounted ref');
// //     }

// //     ref = newRef;
// //     attachListeners(ref);
// //   };

// //   console.log('returning cloned element');
