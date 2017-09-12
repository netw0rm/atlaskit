// @flow

import Item from '@atlaskit/item';
import withItemFocus from '../hoc/withItemFocus';
import withItemClick from '../hoc/withItemClick';

export default withItemClick(withItemFocus(Item));
