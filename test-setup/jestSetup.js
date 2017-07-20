require('es6-promise/auto'); // 'whatwg-fetch' needs a Promise polyfill
require('isomorphic-fetch');
require('raf-stub').replaceRaf([window, global]);
