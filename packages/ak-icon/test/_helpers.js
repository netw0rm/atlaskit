import { baseIconChunkName } from '../bin/constants';
import fileToScope from '../src/fileToScope';

// NOTE context change (../glyph) is a breaking change, as the exports change
const req = require.context('../glyph', true, /^.*\.js/);
export const getGlyphs = () => req.keys().reduce((prev, file) => {
  if (file.indexOf(baseIconChunkName) !== -1) {
    // ignore our base chunk
    return prev;
  }
  prev[fileToScope(file)] = req(file).default;
  return prev;
}, {});
