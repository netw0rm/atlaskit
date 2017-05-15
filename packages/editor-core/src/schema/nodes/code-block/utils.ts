import { getSupportedModes } from '../../../ui/LanguagePicker/languageList';

export function computeChange(oldVal, newVal) {
  let start = 0;
  let oldEnd = oldVal.length;
  let newEnd = newVal.length;
  while (start < oldEnd && oldVal.charCodeAt(start) === newVal.charCodeAt(start)) {
    ++start;
  }
  while (oldEnd > start && newEnd > start && oldVal.charCodeAt(oldEnd - 1) === newVal.charCodeAt(newEnd - 1)) {
    oldEnd--;
    newEnd--;
  }
  return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
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
