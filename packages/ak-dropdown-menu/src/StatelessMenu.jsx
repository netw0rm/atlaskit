import React, { PureComponent, PropTypes } from 'react';
import Droplist from 'ak-droplist';
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

  render = () => {
    const { props } = this;
    return (
      <Droplist
        position={props.position}
        appearance={props.appearance}
        isOpen={props.isOpen}
        onItemActivated={props.onItemActivated}
        onOpenChange={props.onOpenChange}
        isTriggerNotTabbable={(props.triggerType === 'button') || props.isTriggerNotTabbable}
        listContext="menu"
        items={props.items}
      >
        {props.triggerType === 'button' ?
          (<Button
            isSelected={props.isOpen}
            iconAfter={Icon}
          >{props.children}</Button>) : props.children }
      </Droplist>
    );
  }
}
