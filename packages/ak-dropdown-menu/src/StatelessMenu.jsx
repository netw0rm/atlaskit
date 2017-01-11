import React, { PureComponent, PropTypes } from 'react';
import Droplist from 'ak-droplist';
import Item from 'ak-droplist-item';
import Group from 'ak-droplist-group';
import Button from 'ak-button';
import ExpandIcon from 'ak-icon/glyph/expand';

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

  render = () => {
    const { props } = this;
    return (
      <Droplist
        position={props.position}
        appearance={props.appearance}
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        isTriggerNotTabbable={(props.triggerType === 'button') || props.isTriggerNotTabbable}
        listContext="menu"
        trigger={props.triggerType === 'button' ?
          (<Button
            isSelected={props.isOpen}
            iconAfter={Icon}
          >{props.children}</Button>) : props.children}
      >
        {this.renderGroups(props.items)}
      </Droplist>
    );
  }
}
