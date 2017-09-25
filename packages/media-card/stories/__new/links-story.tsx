import {storiesOf} from '@kadira/storybook';
import renderLinkCard from './links/renderLinkCard';
import renderVerticalLinkView from './links/renderVerticalLinkView';

storiesOf('views', {})
  .add('LinkCard', renderLinkCard)
  .add('VerticalLinkView', renderVerticalLinkView)
;
