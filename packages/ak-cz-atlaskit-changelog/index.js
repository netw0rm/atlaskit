/* eslint-disable no-console */
const spawn = require('child_process').spawn;
const czLernaChangelog = require('cz-lerna-changelog');

function log(data) {
  console.log(data.toString());
}

function check(script, shouldShowStderr, cb) {
  const spawned = spawn('npm', ['run', script]);
  spawned.stdout.on('data', log);
  shouldShowStderr && spawned.stderr.on('data', log);
  spawned.on('exit', code => {
    if (code === 0) {
      cb(code);
    }
  });
}

module.exports = {
  prompter(cz, commit) {
    console.log('Linting...');

    check('lint', false, () => {
      console.log('✓ Linting ok');
      console.log('Validating...');
      check('validate', true, () => {
        console.log('✓ Validating ok');
        czLernaChangelog.prompter(cz, commit);
      });
    });
  },
};
