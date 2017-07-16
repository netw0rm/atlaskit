/* tslint:disable: variable-name */
import {storiesOf} from '@kadira/storybook';
import renderCardActionsStory from './internal/renderCardActionsStory';
import renderAppCardViewStory from './internal/renderAppCardViewStory';

storiesOf('Internal views', {})
  .add('CardActions', renderCardActionsStory)
  .add('AppCardView', renderAppCardViewStory)
;
