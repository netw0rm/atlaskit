import glyphs from 'glob!./glyphs.pattern';

export default Object.keys(glyphs).reduce((ret, path) => {
  const key = path.replace(/^\.\.\/tmp\//, '').replace(/\.js$/, '');
  ret[key] = glyphs[path];
  return ret;
}, {});
