import { define } from 'skatejs';
import definition from './index.js';

// Expose the WebComponent
const LayerWC = define('ak-layer', definition);

export { LayerWC };
export default definition;
