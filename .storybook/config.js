const configure = require('@kadira/storybook').configure;

const req = require.context('../packages/', true, /stories\/.*-story\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);

