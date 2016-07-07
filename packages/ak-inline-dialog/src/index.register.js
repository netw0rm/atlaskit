import { define } from 'skatejs';
import definition, { AnimmyTestDefinition } from './index.js';

// Expose the WebComponents
define('ak-inline-dialog', definition);
define('ak-animtest', AnimmyTestDefinition);

export default definition;
