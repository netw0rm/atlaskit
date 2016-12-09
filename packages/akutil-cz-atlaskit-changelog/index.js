/* eslint-disable no-console */
const spawn = require('child_process').spawn;
const czLernaChangelog = require('cz-lerna-changelog');

const stdin = process.openStdin();

function check(script, shouldShowStderr, cb, cbErr) {
  const spawned = spawn('npm', ['run', script, '--silent'], { stdio: 'inherit' });
  spawned.on('exit', (code) => {
    if (code === 0) {
      cb(code);
    } else {
      cbErr(code);
    }
  });
}

function getYN(yes = () => null, no = () => null) {
  const doYN = (d) => {
    const response = d.toString().trim();
    if (response.toLowerCase() === 'y') {
      yes();
    } else {
      no();
    }
    stdin.removeListener('data', doYN);
  };
  stdin.addListener('data', doYN);
}

module.exports = {
  prompter(cz, commit) {
    check('validate/lint-changed', false, () => {
      console.log('✓ Linting ok');
      czLernaChangelog.prompter(cz, {
        questions: {
          scope: {
            message:
              'Denote the scope of this change (build, bump, component, package, docs, story, etc.):\n', //eslint-disable-line max-len
          },
        },
      }, commit);
    }, () => {
      console.log('✗ Linting failed');
      console.log('Do you want to try fixing automatically? (y/n): ');
      getYN(() => {
        check('validate/lint-changed/fix', true, () => {
          console.log('✓ Autofix ok');
          console.log('Try again by adding the changes and recommitting');
          process.exit(0);
        }, () => {
          console.log('✗ Autofix failed');
          console.log('Please resolve the linting problems manually');
          process.exit(1);
        });
      }, () => process.exit(0));
    });
  },
};
