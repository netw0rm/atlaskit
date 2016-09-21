import glyphs from 'glob!./glyphs.pattern';

const ret = {};

Object.keys(glyphs).forEach((path) => {
  const key = path.replace(/^\.\.\/tmp\//, '').replace(/\.js$/, '');
  ret[key] = glyphs[path];
});

export default ret;
