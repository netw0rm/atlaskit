import React, { PureComponent, PropTypes } from 'react';

import StatelessDropdownMenu from './StatelessMenu';

/* eslint-disable react/no-unused-prop-types */
export default class DropdownMenu extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    defaultOpen: PropTypes.bool,
    isTriggerNotTabbable: PropTypes.bool,
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onItemActivated: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    triggerType: PropTypes.oneOf(['default', 'button']),
  }

  static defaultProps = {
    appearance: 'default',
    defaultOpen: false,
    isTriggerNotTabbable: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    triggerType: 'default',
  }

  state = {
    isOpen: this.props.defaultOpen,
    items: [...this.props.items],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.items) {
      this.setState({ items: [...nextProps.items] });
    }
  }

  findActivatedGroup = item => this.state.items.filter(group => group.items.indexOf(item) > -1)[0]

  handleItemActivation = (attrs) => {
    const activatedItem = attrs.item;
    const activatedGroup = this.findActivatedGroup(activatedItem);
    const items = [...this.state.items];

    switch (activatedItem.type) {
      case 'checkbox':
        activatedItem.isChecked = !activatedItem.isChecked;
        this.props.onItemActivated({ item: activatedItem });
        this.setState({ items });
        break;
      case 'radio':
        activatedGroup.items.forEach((i) => {
          if (i === activatedItem) {
            i.isChecked = true;
          } else {
            i.isChecked = false;
          }
        });
        this.props.onItemActivated({ item: activatedItem });
        this.setState({ items });
        break;
      case 'link':
      default:
        this.props.onItemActivated({ item: activatedItem });
        if (!activatedItem.href) { // TODO: AK-1299
          this.close();
        }
        break;
    }
  }

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  close = () => {
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false });
  }

  render = () => {
    const { props, state } = this;
    return (
      <StatelessDropdownMenu
        position={props.position}
        appearance={props.appearance}
        isOpen={state.isOpen}
        onItemActivated={this.handleItemActivation}
        onOpenChange={this.handleOpenChange}
        isTriggerNotTabbable={props.isTriggerNotTabbable}
        triggerType={props.triggerType}
        items={state.items}
      >
        { props.children }
      </StatelessDropdownMenu>
    );
  }
}

export { StatelessDropdownMenu };
