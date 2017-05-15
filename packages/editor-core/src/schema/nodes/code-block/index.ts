import '!style!css!less!codemirror/lib/codemirror.css';
import { requireModes } from './utils';
requireModes();

export { codeBlock } from './nodeSpec';
export { CodeBlockView } from './nodeView';
