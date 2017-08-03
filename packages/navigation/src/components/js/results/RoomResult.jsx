import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AtlassianContainerResult from './AtlassianContainerResult';

const noOp = () => {};

const ROOM_RESULT_TYPE = 'room';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// Or, if a prop or feature may be useful for all container types, add
// it to AtlassianContainerResult instead
// ===================================================================

export default class RoomResult extends PureComponent {
  static propTypes = {
    topic: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    isSelected: false,
    isTabbingDisabled: false,
    onClick: noOp,
    onMouseEnter: noOp,
    onMouseLeave: noOp,
    privacy: 'none',
    type: ROOM_RESULT_TYPE,
  }

  render() {
    const {
      topic,
      ...containerResultProps
    } = this.props;
    return (
      <AtlassianContainerResult
        {...containerResultProps}
        subText={topic}
      />
    );
  }
}
