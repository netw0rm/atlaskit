import {storiesOf} from '@kadira/storybook';
import renderEditableStory from './view-story/renderEditableStory';

storiesOf('FilmstripView', module)
  .add('Make your own 🍽', renderEditableStory)
;

