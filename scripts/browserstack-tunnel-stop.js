// @flow
import { spawn } from './utils/processes';

spawn('/BrowserStackLocal', [
  '--key', '$BROWSERSTACK_KEY',
  '--localIdentifier', '$BITBUCKET_COMMIT',
  '--daemon', 'stop'
]);
