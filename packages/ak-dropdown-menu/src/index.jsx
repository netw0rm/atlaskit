import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import Layer from 'ak-layer';
import Group from 'ak-droplist-group';
import Trigger from 'ak-droplist-trigger';
import Item from 'ak-droplist-item';

export { Trigger };

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class DropdownMenu
 */
export default class DropdownMenu extends Component {
  static propTypes = {
    position: PropTypes.string,
    trigger: PropTypes.node,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    isOpenInitially: PropTypes.bool,
    onItemActivated: PropTypes.func,
    onOpenChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    position: 'bottom left',
    onItemActivated: () => {},
    onOpenChange: () => {},
    isOpenInitially: false,
  }

  state = {
    isOpen: this.props.isOpenInitially,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
      this.close();
    }
  }

  handleTriggerActivation = () => {
    this.toggle();
  }

  handleItemActivation = (item) => { // eslint-disable-line arrow-body-style
    return () => {
      this.props.onItemActivated(item);
      this.close();
    };
  }

  open = () => {
    this.setState({ isOpen: true });
    this.props.onOpenChange(true);
  }

  close = () => {
    this.setState({ isOpen: false });
    this.props.onOpenChange(false);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.onOpenChange(this.state.isOpen);
  }

  renderTrigger = (trigger) => {
    if (trigger.type !== Trigger) {
      return <Trigger onActivate={this.handleTriggerActivation}>{trigger}</Trigger>;
    }

    return (
      <Trigger
        {...trigger.props}
        isOpened={this.state.isOpen}
        onActivate={() => {
          trigger.props.onActivate();
          this.handleTriggerActivation();
        }}
      >{trigger.props.children}</Trigger>
    );
  }

  renderSubComponents = (groups) => { // eslint-disable-line arrow-body-style
    return groups.map((group, groupIndex) => {
      const items = group.items.map((item, itemIndex) => { // eslint-disable-line arrow-body-style
        return (
          <Item
            key={itemIndex}
            href={item.href}
            target={item.target}
            type={item.type}
            isActive={item.isActive}
            isDisabled={item.isDisabled}
            isHidden={item.isHidden}
            isChecked={item.isChecked}
            elemBefore={item.elemBefore}
            onActivate={this.handleItemActivation(item)}
          >
            {item.content}
          </Item>
        );
      });
      return <Group heading={group.heading} key={groupIndex}>{items}</Group>;
    });
  }

  render = () => {
    const { props, state } = this;

    return (
      <div className={styles.dropWrapper}>
        <Layer
          position={props.position}
          offset="0 4"
          content={state.isOpen ?
            <div className={styles.dropContent}>{this.renderSubComponents(props.items)}</div> :
            null
          }
        >
          <div className={styles.dropTrigger}>{this.renderTrigger(props.children)}</div>
        </Layer>
      </div>
    );
  }
}
