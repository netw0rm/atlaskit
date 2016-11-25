import React from 'react';
import reactify from 'akutil-react';
import AkTagWebComponent, { events as tagEvents } from 'ak-tag';

import groupStyles from '../src/shadow.less';
import WebComponent from '../src';

const { beforeRemove: beforeRemoveEvent, afterRemove: afterRemoveEvent } = tagEvents;

const Group = reactify(WebComponent);

const Tag = reactify(AkTagWebComponent);

class EventedGroup extends React.PureComponent {

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
    const tags = this.state.tags.filter(text => text !== e.target.text);
    this.setState({ tags });
  }

  render() {
    return (
      <div ref={g => (this.group = g)}>
        <input
          id="allow-remove"
          type="checkbox"
          defaultChecked={this.state.allowRemoval}
          onChange={e => (this.setState({ allowRemoval: e.target.checked }))}
        />
        <label htmlFor="allow-remove">Allow tag removal</label>
        <hr />
        <Group className={groupStyles.locals.akTagGroup} alignment={this.state.alignment}>
          {this.state.tags.map(text => (<Tag
            text={text}
            key={text}
            remove-button-text="Remove me"
          />))}
        </Group>
      </div>
    );
  }
}

EventedGroup.displayName = 'EventedGroup';
EventedGroup.propTypes = {
  alignment: React.PropTypes.string,
  initialTags: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onRemove: React.PropTypes.func,
};

export default EventedGroup;
