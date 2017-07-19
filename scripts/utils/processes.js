// @flow
// $FlowFixMe: node_modules is being ignored
import pSpawn from 'projector-spawn';

export function spawn(cmd: string, args: Array<string> = [], opts?: child_process$spawnOpts = {}) { // eslint-disable-line
  return pSpawn(cmd, args, opts).catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
}
