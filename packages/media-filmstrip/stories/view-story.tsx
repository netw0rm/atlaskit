import { storiesOf } from '@kadira/storybook';
import renderEditableStory from './view-story/renderEditableStory';
import renderSmartCardChildren from './view-story/renderSmartCardChildren';
import renderPureComponent from './view-story/renderPureComponent';

storiesOf('FilmstripView', module)
  .add('Make your own 🍽', renderEditableStory)
  .add('Test: With smart-card children', renderSmartCardChildren)
  .add('Test: In a PureComponent', renderPureComponent)
;

