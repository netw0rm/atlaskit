import { define } from 'skatejs';
import definition, { AnimmyTestDefinition } from './index.js';

// Expose the WebComponents
export default define('ak-inline-dialog', definition);
const akAnimtest = define('ak-animtest', AnimmyTestDefinition);
export { akAnimtest };
