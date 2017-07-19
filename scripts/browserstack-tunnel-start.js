// @flow
import { spawn } from './utils/processes';

spawn('/BrowserStackLocal', [
  '--key', '$BROWSERSTACK_KEY',
  '--localIdentifier', '$BITBUCKET_COMMIT',
  '--force',
  '--force-local',
  '--only-automate',
  '--parallel-runs', '5',
  '--daemon',
  'start'
]);
