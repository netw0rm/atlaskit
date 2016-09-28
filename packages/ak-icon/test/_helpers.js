// eslint-disable-next-line no-unused-vars
import { baseIconChunkName, glyphFolderName } from '../bin/constants';
import fileToScope from '../src/fileToScope';

export const getGlyphs = () => {
  // TODO use `../${glyphFolderName}` here as soon as webpack supports require.context with vars
  const req = require.context('../glyph', true, /^.*\.js/);
  return req.keys().reduce((prev, file) => {
    if (file.indexOf(baseIconChunkName) !== -1) {
      // ignore our base chunk
      return prev;
    }
    prev[fileToScope(file)] = req(file).default;
    return prev;
  }, {});
};
