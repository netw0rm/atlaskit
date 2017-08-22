// @flow

import RadioIcon from '@atlaskit/icon/glyph/radio';
import Item from '@atlaskit/item';
import withItemFocus from '../hoc/withItemFocus';
import withToggleInteraction from '../hoc/withToggleInteraction';
import supportsVoiceover from '../../util/supportsVoiceover';

export default withToggleInteraction(
  withItemFocus(Item),
  RadioIcon,
  supportsVoiceover ? 'radio' : 'menuitemradio'
);
