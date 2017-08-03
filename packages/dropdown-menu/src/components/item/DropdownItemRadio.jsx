// @flow

import RadioIcon from '@atlaskit/icon/glyph/radio';
import Item from '@atlaskit/item';
import withItemFocus from '../hoc/withItemFocus';
import withToggleInteraction from '../hoc/withToggleInteraction';

export default withToggleInteraction(
  withItemFocus(Item),
  RadioIcon,
  'radio'
);
