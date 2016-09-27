import { baseIconChunkName, glyphFolderName } from '../bin/constants';
import fileToScope from '../src/fileToScope';

const req = require.context(`../${glyphFolderName}`, true, /^.*\.js/);
export const getGlyphs = () => req.keys().reduce((prev, file) => {
  if (file.indexOf(baseIconChunkName) !== -1) {
    // ignore our base chunk
    return prev;
  }
  prev[fileToScope(file)] = req(file).default;
  return prev;
}, {});
