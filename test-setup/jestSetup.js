require('whatwg-fetch');
require('raf-stub').replaceRaf([
  global,
  typeof window !== 'undefined' ? window : {},
]);
