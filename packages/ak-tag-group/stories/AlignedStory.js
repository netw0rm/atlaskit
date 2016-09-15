import EventedGroup from './EventedGroup.js';
const { React } = window;

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
