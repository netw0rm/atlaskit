export default function fileToScope(file) {
  return file.replace(/^\.\//, '').replace(/\.js$/, '');
}
