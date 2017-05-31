// // declare class Rebaseable {
// //   constructor(step)
// // }

// export class collab
declare module 'prosemirror-collab' {
  const collab: any;
  const receiveTransaction: any;
  const sendableSteps: any;
  const getVersion: any;

  export {
    collab,
    receiveTransaction,
    sendableSteps,
    getVersion,
  };
}
