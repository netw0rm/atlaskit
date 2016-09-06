import reactify from 'akutil-react';
import tagStyles from 'style!ak-tag/src/host.less';
import AkTagWebComponent, { events as tagEvents } from 'ak-tag';
const { beforeRemove: beforeRemoveEvent, afterRemove: afterRemoveEvent } = tagEvents;
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

    this.state = {
      tags: this.props.initialTags,
      allowRemoval: true,
      alignment: this.props.alignment,
    };
    this.boundBeforeRemoveCallback = this.beforeRemoveCallback.bind(this);
    this.boundAfterRemoveCallback = this.afterRemoveCallback.bind(this);
    this.onRemove = this.props.onRemove || (() => null);
  }

  componentDidMount() {
    this.group.addEventListener(beforeRemoveEvent, this.boundBeforeRemoveCallback);
    this.group.addEventListener(afterRemoveEvent, this.boundAfterRemoveCallback);
  }

  componentWillUnmount() {
    this.group.removeEventListener(beforeRemoveEvent, this.boundBeforeRemoveCallback);
    this.group.removeEventListener(afterRemoveEvent, this.boundAfterRemoveCallback);
  }

  beforeRemoveCallback(e) {
    if (!this.state.allowRemoval) {
      e.preventDefault();
    }
  }

  afterRemoveCallback(e) {
    this.onRemove(e.target.text);
    const tags = this.state.tags.filter((text) => text !== e.target.text);
    this.setState({ tags });
  }

  render() {
    return (
      <div ref={(g) => (this.group = g)}>
        <input
          id="allow-remove"
          type="checkbox"
          defaultChecked={this.state.allowRemoval}
          onChange={(e) => (this.setState({ allowRemoval: e.target.checked }))}
        />
        <label htmlFor="allow-remove">Allow tag removal</label>
        <hr />
        <Group alignment={this.state.alignment}>
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
  alignment: React.PropTypes.string.isRequired,
  initialTags: React.PropTypes.array.isRequired,
  onRemove: React.PropTypes.func,
};

export default EventedGroup;
