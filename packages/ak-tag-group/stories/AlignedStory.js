import EventedGroup from './EventedGroup.js';
import React from 'react';

const AlignedStory = (props) => (<EventedGroup
  alignment={props.alignment}
  initialTags={props.initialTags}
  onRemove={props.onRemove}
/>);

AlignedStory.propTypes = {
  alignment: React.PropTypes.string,
  initialTags: React.PropTypes.array.isRequired,
  onRemove: React.PropTypes.func,
};

export default AlignedStory;
