import '!style!css!less!codemirror/lib/codemirror.css';
import 'codemirror/mode/meta';
import * as CodeMirror from 'codemirror/lib/codemirror';
export default CodeMirror;

import { requireModes } from './utils';

requireModes();
