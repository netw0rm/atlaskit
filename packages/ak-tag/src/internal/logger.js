import debug from 'debug';

import { name } from '../../package.json';


if (process.env.NODE_ENV === 'development') {
  localStorage.debug = `${name}:*`;
}

export default {
  log: debug(`${name}:log`),
  warn: debug(`${name}:warn`),
  error: debug(`${name}:error`),
};
