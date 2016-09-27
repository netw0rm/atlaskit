import { baseIconChunkName, glyphFolderName } from '../bin/constants';
import fileToScope from '../src/fileToScope';

export const getGlyphs = () => {

  const req = require.context(`../${glyphFolderName}`, true, /^.*\.js/);
  return req.keys().reduce((prev, file) => {
    if (file.indexOf(baseIconChunkName) !== -1) {
      // ignore our base chunk
      return prev;
    }
    prev[fileToScope(file)] = req(file).default;
    return prev;
  }, {});
};
