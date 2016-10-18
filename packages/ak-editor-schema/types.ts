declare module 'akutil-react';
declare module 'react-dom';
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
declare module 'ak-editor-bitbucket';
declare module 'ak-tabs';
