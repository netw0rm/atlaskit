// tslint:disable:no-bitwise
const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

let staticValue: string | boolean = false;

export default {
  setStatic(value: string | boolean) {
    staticValue = value;
  },

  generate() {
    return staticValue || uuid();
  }
};
