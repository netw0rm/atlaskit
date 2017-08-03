import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AtlassianContainerResult from './AtlassianContainerResult';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// Or, if a prop or feature may be useful for all container types, add
// it to AtlassianContainerResult instead
// ===================================================================

export default class ConfluenceSpaceResult extends PureComponent {
  static propTypes = {
    spaceType: PropTypes.oneOf(['Documentation', 'Space']),
  }

  render() {
    const {
      spaceType,
      ...containerResultProps
    } = this.props;
    return (
      <AtlassianContainerResult
        {...containerResultProps}
        subText={spaceType}
      />
    );
  }
}
