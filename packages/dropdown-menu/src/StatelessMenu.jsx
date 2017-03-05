import React, { PureComponent, PropTypes } from 'react';
import Droplist from '@atlaskit/droplist';
import Item from '@atlaskit/droplist-item';
import Group from '@atlaskit/droplist-group';
import Button from '@atlaskit/button';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import uid from 'uid';

const Icon = <ExpandIcon label="" />;

/* eslint-disable react/no-unused-prop-types */
export default class StatelessDropdownMenu extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    isTriggerNotTabbable: PropTypes.bool,
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onItemActivated: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    triggerType: PropTypes.oneOf(['default', 'button']),
    triggerButtonProps: PropTypes.shape(Button.propTypes),
    shouldFlip: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
    isOpen: false,
    isTriggerNotTabbable: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    triggerType: 'default',
    triggerButtonProps: {},
    shouldFlip: true,
  }

  state = {
    id: uid(),
  }

  renderItems = items => items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      onActivate={() => {
        this.props.onItemActivated({ item });
      }}
    >
      {item.content}
    </Item>
  )

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group heading={group.heading} key={groupIndex}>{this.renderItems(group.items)}</Group>
  )

  renderTrigger = () => {
    if (this.props.triggerType === 'button') {
      const triggerProps = { ...this.props.triggerButtonProps };
      const defaultButtonProps = {
        isSelected: this.props.isOpen,
        ariaHaspopup: true,
        ariaExpanded: this.props.isOpen,
        ariaControls: this.state.id,
      };
      if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
        triggerProps.iconAfter = Icon;
      }
      return (
        <Button {...defaultButtonProps} {...triggerProps}>{ this.props.children }</Button>
      );
    }
    return this.props.children;
  }

  render() {
    const { props, state } = this;
    return (
      <Droplist
        position={props.position}
        appearance={props.appearance}
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        isTriggerNotTabbable={(props.triggerType === 'button') || props.isTriggerNotTabbable}
        shouldFlip={props.shouldFlip}
        trigger={this.renderTrigger()}
      >
        <div id={state.id} role="menu">
          {this.renderGroups(props.items)}
        </div>
      </Droplist>
    );
  }
}
