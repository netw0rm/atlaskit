import { getSupportedModes } from '../ui/LanguagePicker/languageList';

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
