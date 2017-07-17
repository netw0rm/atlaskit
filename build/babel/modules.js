const preset = require('./preset');

module.exports = {
  babelrc: false,
  presets: [
    [preset, { modules: false }],
  ],
};
