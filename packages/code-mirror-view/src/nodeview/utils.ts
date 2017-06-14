import CodeMirror from '../codemirror';
import { DEFAULT_LANGUAGES } from '@atlaskit/editor-core';

function getSupportedModes() {
  const modes = (
    DEFAULT_LANGUAGES
      .map(langObj => langObj.alias.map(lang => CodeMirror.findModeByName(lang))[0])
      .filter(mode => !!mode)
  )
  .map(modeInfo => modeInfo.mode)
  .filter((mode, index, self) => self.indexOf(mode) === index);
  return modes;
}

export function requireModes() {
  const req = require.context('codemirror/mode/', true, /\.js$/);
  const modes = getSupportedModes();
  const paths = req.keys();

  modes.forEach(mode => {
    paths.forEach(path => {
      if (path === `./${mode}/${mode}.js`) {
        req(path);
      }
    });
  });
}

export function findMode(mode: string) {
  const matches = DEFAULT_LANGUAGES.filter(language => language.alias.indexOf(mode.toLowerCase()) !== -1);

  if (!matches.length) {
    return false;
  }

  const modes = matches[0].alias.map(lang => CodeMirror.findModeByName(lang)).filter(mode => !!mode);
  return modes[0];
}
