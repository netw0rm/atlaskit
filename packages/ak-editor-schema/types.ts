declare module 'ajv' {
  interface Validator {
    (object: Object): boolean;
    errors: string | null;
  }

  export default class Ajv {
    compile(schema: Object): Validator;
  }
}
declare module 'highlight.js';
