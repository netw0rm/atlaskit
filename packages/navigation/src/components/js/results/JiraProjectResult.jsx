import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AtlassianContainerResult from './AtlassianContainerResult';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// Or, if a prop or feature may be useful for all container types, add
// it to AtlassianContainerResult instead
// ===================================================================

export default class JiraProjectResult extends PureComponent {
  static propTypes = {
    projectType: PropTypes.oneOf(['Business project', 'Software project', 'Service desk']),
  }

  render() {
    const {
      projectType,
      ...containerResultProps
    } = this.props;
    return (
      <AtlassianContainerResult
        {...containerResultProps}
        subText={projectType}
      />
    );
  }
}
