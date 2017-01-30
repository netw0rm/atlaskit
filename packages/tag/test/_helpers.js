import { define } from 'skatejs';
import {
  createTemporaryComponent,
  tearDownComponent,
  getRootNode,
} from 'akutil-common-test';

export const createTemporary = definition => createTemporaryComponent(define, definition);
export const removeTemporary = tearDownComponent;
export { getRootNode };
