import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { name } from '../package.json';
import addStories from './_add-stories';
import { Adg2ThemeWrapper } from './button-story-wrappers';

addStories(storiesOf(`${name} with adg2 theme`, module), reactify(Adg2ThemeWrapper));
