import { configure } from '@kadira/storybook';

const req = require.context('../packages/', true, /stories\/.*-story\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
