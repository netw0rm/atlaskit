import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import addStories from './_add-stories';


addStories(storiesOf(name, module));
