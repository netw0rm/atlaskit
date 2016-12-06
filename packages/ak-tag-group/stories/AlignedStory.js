import React from 'react';

import EventedGroup from './EventedGroup';

const AlignedStory = props => (<EventedGroup
  alignment={props.alignment}
  initialTags={props.initialTags}
  onRemove={props.onRemove}
/>);

AlignedStory.propTypes = {
  alignment: React.PropTypes.string,
  initialTags: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onRemove: React.PropTypes.func,
};

export default AlignedStory;
