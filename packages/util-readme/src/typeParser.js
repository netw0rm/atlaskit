export default function typeParser(type) {
  if (!type.name && !type.value) {
    return '';
  }

  if (!type.value) {
    return type.name;
  }

  if (typeof type.value === 'string') {
    return type.value.replace(/PropTypes./g, '');
  }

  if (type.name === 'arrayOf') {
    return `[ ${typeParser(type.value)} ]`;
  }

  if (Array.isArray(type.value)) {
    return `( ${type.value.map(typeParser).join(' | ')} )`;
  }

  if (typeof type.value === 'object') {
    const keys = Object.keys(type.value);
    const shape = keys.reduce((p, c) => Object.assign(p, { [c]: typeParser(type.value[c]) }), {});
    return JSON.stringify(shape);
  }

  return null;
}
