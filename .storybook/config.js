import { configure } from '@kadira/storybook';
import 'ak-util-polyfills';
const req = require.context('../packages/', true, /stories\/.*-story\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
