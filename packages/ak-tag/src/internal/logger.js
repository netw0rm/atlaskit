import { name } from '../../package.json';

function warn(text) {
  console.warn(`${name}: ${text}`); // eslint-disable-line no-console
}

function log(text) {
  console.log(`${name}: ${text}`); // eslint-disable-line no-console
}

export default { warn, log };
