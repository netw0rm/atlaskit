import reactify from 'akutil-react';
import tagStyles from 'style!ak-tag/src/host.less';
import AkTagWebComponent, { EVENTS as TAG_EVENTS } from 'ak-tag';
import WebComponent from '../src/index';
const { React, ReactDOM } = window;

const Group = reactify(WebComponent, {
  React,
  ReactDOM,
});

const Tag = reactify(AkTagWebComponent, {
  React,
  ReactDOM,
});


class EventedGroup extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = { tags: this.props.initialTags };
    this.boundRemoveCallback = this.removeCallback.bind(this);
    this.onRemove = this.props.onRemove || (() => null);
  }

  componentDidMount() {
    this.group.addEventListener(TAG_EVENTS.REMOVE, this.boundRemoveCallback);
  }

  componentWillUnmount() {
    this.group.removeEventListener(TAG_EVENTS.REMOVE, this.boundRemoveCallback);
  }

  removeCallback(e) {
    this.onRemove(e.target.text);
    const tags = this.state.tags.filter((text) => text !== e.target.text);
    this.setState({ tags });
  }

  render() {
    return (
      <div ref={(g) => (this.group = g)}>
        <Group>
          {this.state.tags.map((text) => (<Tag
            text={text}
            key={text}
            className={tagStyles.akTag}
            remove-button-text="Remove me"
          />))}
        </Group>
      </div>
    );
  }
}

EventedGroup.displayName = 'EventedGroup';
EventedGroup.propTypes = {
  initialTags: React.PropTypes.array.isRequired,
  onRemove: React.PropTypes.func,
};

export default EventedGroup;
