import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import Layer from 'ak-layer';
import Trigger from 'ak-droplist-trigger';
import keyCode from 'keycode';

const halfGrid = 4;
const itemHeight = halfGrid * 7;
const dropdownMaxHeight = (itemHeight * 9.5) + (halfGrid * 2);

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class Droplist
 */
export default class DropdownList extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    isTriggerNotTabbable: PropTypes.bool,
    listContext: PropTypes.oneOf(['menu']),
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    trigger: PropTypes.node,
  }

  static defaultProps = {
    appearance: 'default',
    position: 'bottom left',
    isOpen: false,
    isTriggerNotTabbable: false,
    listContext: 'menu',
    onOpenChange: () => {},
    children: null,
    trigger: null,
  }

  componentDidMount = () => {
    if (this.domItemsList) {
      this.focusFirstItem();
    }
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      this.focusFirstItem();
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  setMaxHeight = (dropDomRef) => {
    const { appearance } = this.props;
    dropDomRef.style.maxHeight = appearance !== 'tall' ? `${dropdownMaxHeight}px` : 'none';
  }

  getNextFocusable = (indexItem, available) => {
    let currentItem = indexItem === undefined ? -1 : indexItem;
    const latestAvailable = available || currentItem;

    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getNextFocusable(currentItem, latestAvailable);
    }

    return latestAvailable;
  }

  getPrevFocusable = (indexItem, latestAvailable) => {
    let currentItem = indexItem;

    if (latestAvailable === undefined) {
      latestAvailable = currentItem; // eslint-disable-line no-param-reassign
    }

    if (currentItem > 0) {
      currentItem--;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getPrevFocusable(currentItem, latestAvailable);
    }

    return latestAvailable || currentItem;
  }

  focusFirstItem = () => {
    if (this.sourceOfIsOpen === 'keydown') {
      this.focusItem(this.getNextFocusable());
    }
  }

  focusNextItem = () => {
    this.focusItem(this.getNextFocusable(this.focusedItem));
  }

  focusPreviousItem = () => {
    this.focusItem(this.getPrevFocusable(this.focusedItem));
  }

  focusItem = (index) => {
    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  }

  handleKeyDown = (e) => {
    if (e.keyCode === keyCode('escape')) {
      this.close();
    }

    if (this.props.isOpen && e.target.getAttribute('data-role') === 'droplistItem') {
      e.preventDefault();
      switch (e.keyCode) {
        case keyCode('up'):
          this.focusPreviousItem();
          break;
        case keyCode('down'):
          this.focusNextItem();
          break;
        case keyCode('tab'):
          this.close();
          break;
        default:
          break;
      }
    }
  }

  handleClickOutside = (e) => {
    if (this.props.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
        this.close();
      }
    }
  }

  handleTriggerActivation = (e) => {
    this.toggle({ source: e.source });
  }

  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true });
  }

  close = () => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false });
  }

  toggle = (attrs) => {
    if (this.props.isOpen) {
      this.close();
    } else {
      this.open(attrs);
    }
  }

  render = () => {
    const { props } = this;
    return (
      <div className={styles.dropWrapper}>
        <Layer
          position={props.position}
          offset="0 4"
          content={props.isOpen ?
            <div
              className={styles.dropContent}
              ref={(ref) => {
                if (ref) {
                  this.domItemsList = ref.querySelectorAll('[data-role="droplistItem"]');
                  this.setMaxHeight(ref);
                }
              }}
              role="menu"
            >
              {props.children}
            </div> :
            null
          }
        >
          <div className={styles.dropTrigger}>
            <Trigger
              isNotTabbable={props.isTriggerNotTabbable}
              isOpened={props.isOpen}
              onActivate={this.handleTriggerActivation}
            >{props.trigger}</Trigger>
          </div>
        </Layer>
      </div>
    );
  }
}
