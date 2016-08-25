export default function uniqueId(prefix = '') {
  const id = Math.random().toString(36).substr(2, 9);
  return `${prefix}_${id}`;
}
