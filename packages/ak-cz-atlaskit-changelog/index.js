/* eslint-disable no-console */
const spawn = require('child_process').spawn;
const czLernaChangelog = require('cz-lerna-changelog');

function log(data) {
  console.log(data.toString());
}

module.exports = {
  prompter(cz, commit) {
    console.log('Linting...');
    const lint = spawn('npm', ['run', 'lint']);
    lint.stdout.on('data', log);

    lint.on('exit', code => {
      if (code === 0) {
        console.log('Linting ok!');
        czLernaChangelog.prompter(cz, commit);
      }
    });
  },
};
