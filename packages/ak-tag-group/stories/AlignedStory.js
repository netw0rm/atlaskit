import EventedGroup from './EventedGroup.js';
import styles from 'style!./../src/host.less';
const { React } = window;

const AlignedStory = (props) => (
  <div style={{ textAlign: props.alignment }}>
    <EventedGroup
      alignment={props.alignment}
      className={styles.akTagGroup}
      initialTags={props.initialTags}
      onRemove={props.onRemove}
    />
  </div>
);
AlignedStory.propTypes = {
  alignment: React.PropTypes.string.isRequired,
  initialTags: React.PropTypes.array.isRequired,
  onRemove: React.PropTypes.func,
};

export default AlignedStory;
