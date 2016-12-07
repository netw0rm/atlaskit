import React, { PureComponent } from 'react';
import Tag from 'ak-tag';

import groupStyles from '../src/styles.less';
import Group from '../src';

export default class EventedGroup extends PureComponent {

  static propTypes = {
    alignment: React.PropTypes.string,
    initialTags: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onRemove: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      tags: this.props.initialTags,
      allowRemoval: true,
      alignment: this.props.alignment,
    };
    this.onRemove = this.props.onRemove || (() => null);
  }

  beforeRemoveCallback = () => !!this.state.allowRemoval;

  afterRemoveCallback = (removedTagText) => {
    this.onRemove(removedTagText);
    const tags = this.state.tags.filter(text => text !== removedTagText);
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
          {
            this.state.tags.map(text => (
              <Tag
                text={text}
                key={text}
                removeButtonText="Remove me"
                onBeforeRemoveAction={this.beforeRemoveCallback}
                onAfterRemoveAction={this.afterRemoveCallback}
              />
            ))
          }
        </Group>
      </div>
    );
  }
}
