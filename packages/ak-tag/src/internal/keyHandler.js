import { KeyPressHandler } from 'akutil-common';
const handledKeys = ['ENTER', 'SPACE'];

export default (elem, cb) => {
  const handler = new KeyPressHandler(handledKeys[0], cb, elem);
  handledKeys.slice(1).forEach((keyName) => handler.add(keyName, cb));
  return handler;
};

export { handledKeys };
