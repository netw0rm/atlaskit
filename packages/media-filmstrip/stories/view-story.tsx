import { storiesOf } from '@kadira/storybook';
import renderChildren from './view-story/renderChildren';
import renderEditableStory from './view-story/renderEditableStory';

storiesOf('FilmstripView', module)
  .add('Make your own 🍽', renderEditableStory)
  .add('Children', renderChildren)
;

