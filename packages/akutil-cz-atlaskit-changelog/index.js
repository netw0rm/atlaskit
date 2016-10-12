/* eslint-disable no-console */
const spawn = require('child_process').spawn;
const czLernaChangelog = require('cz-lerna-changelog');

function check(script, shouldShowStderr, cb) {
  const spawned = spawn('npm', ['run', script, '--silent'], { stdio: 'inherit' });
  spawned.on('exit', (code) => {
    if (code === 0) {
      cb(code);
    }
  });
}

module.exports = {
  prompter(cz, commit) {
    check('validate/lint-changed', false, () => {
      console.log('✓ Linting ok');
      czLernaChangelog.prompter(cz, {
        questions: {
          scope: {
            message:
              `Denote the scope of this change (build, bump, component, package, docs, story, etc.):\n`, //eslint-disable-line max-len
          },
        },
      }, commit);
    });
  },
};
