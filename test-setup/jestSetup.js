const win = typeof window !== 'undefined' ? window : {};
require('whatwg-fetch');
require('raf-stub').replaceRaf([win, global]);
