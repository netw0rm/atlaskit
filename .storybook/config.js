import path from 'path';
import { configure } from '@kadira/storybook';

const req = require.context(`../packages/`, true, /stories\/.+-story\.js$/);

function loadStories() {
  let stories = req.keys();
  if (PACKAGE_FOLDERS.length) {
    console.log(`Storybook: Only loading stories for: ${PACKAGE_FOLDERS}`);
    stories = stories.filter((p) => PACKAGE_FOLDERS.indexOf(p.split(path.sep)[1]) !== -1)
  }
  stories.forEach(req);
}

configure(loadStories, module);
