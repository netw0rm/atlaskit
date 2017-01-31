import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import Layer from '@atlaskit/layer';
import Trigger from '@atlaskit/droplist-trigger';
import classnames from 'classnames';

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
    shouldFitContainer: PropTypes.bool,
    isTriggerNotTabbable: PropTypes.bool,
    listContext: PropTypes.oneOf(['menu']),
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    trigger: PropTypes.node,
    shouldFlip: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
    position: 'bottom left',
    isOpen: false,
    shouldFitContainer: false,
    isTriggerNotTabbable: false,
    listContext: 'menu',
    onOpenChange: () => {},
    children: null,
    trigger: null,
    shouldFlip: true,
  }

  componentDidMount = () => {
    if (this.domItemsList) {
      this.focusFirstItem();
    }

    if (this.props.shouldFitContainer && this.dropContentRef) {
      this.dropContentRef.style.width = `${this.triggerRef.offsetWidth}px`;
    }

    document.addEventListener('click', this.handleClickOutside);
  }

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      this.focusFirstItem();

      if (this.props.shouldFitContainer && this.dropContentRef) {
        this.dropContentRef.style.width = `${this.triggerRef.offsetWidth}px`;
      }
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setMaxHeight = (dropDomRef) => {
    const { appearance } = this.props;
    dropDomRef.style.maxHeight = appearance !== 'tall' ? `${dropdownMaxHeight}px` : 'none';
  }

  getNextFocusable = (indexItem, available) => {
    let currentItem = indexItem === undefined ? -1 : indexItem;
    const latestAvailable = available === undefined ? currentItem : available;

    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getNextFocusable(currentItem, latestAvailable);
    }

    return latestAvailable;
  }

  getPrevFocusable = (indexItem, available) => {
    let currentItem = indexItem;
    const latestAvailable = available === undefined ? currentItem : available;

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

  isTargetChildItem = target => target && (target.getAttribute('data-role') === 'droplistItem') &&
    ReactDOM.findDOMNode(this).contains(target) // eslint-disable-line react/no-find-dom-node

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.close({ event });
    }

    if (this.props.isOpen) {
      if (this.isTargetChildItem(event.target)) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            this.focusPreviousItem();
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.focusNextItem();
            break;
          case 'Tab':
            event.preventDefault();
            this.close({ event });
            break;
          default:
            break;
        }
      } else if (event.key === 'ArrowDown') {
        this.sourceOfIsOpen = 'keydown';
        this.focusFirstItem();
      } else if (event.key === 'Tab') {
        this.close({ event });
      }
    }
  }

  handleClickOutside = (event) => {
    if (this.props.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (event.target instanceof Node && !domNode.contains(event.target))) {
        this.close({ event });
      }
    }
  }

  handleTriggerActivation = (event) => {
    this.toggle({ source: event.source, event });
  }

  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true, event: attrs.event });
  }

  close = (attrs) => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  toggle = (attrs) => {
    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  render = () => {
    const { props } = this;

    // items' event delegation
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={classnames([styles.dropWrapper, {
          [styles.fitContainer]: props.shouldFitContainer,
        }])}
        onKeyDown={this.handleKeyDown}
      >
        <Layer
          position={props.position}
          offset="0 4"
          autoPosition={props.shouldFlip}
          content={props.isOpen ?
            <div
              className={styles.dropContent}
              ref={(ref) => {
                if (ref) {
                  this.dropContentRef = ref;
                  this.domItemsList = ref.querySelectorAll('[data-role="droplistItem"]');
                  this.setMaxHeight(ref);
                }
              }}
            >
              {props.children}
            </div> :
            null
          }
        >
          <div className={styles.dropTrigger} ref={ref => (this.triggerRef = ref)}>
            <Trigger
              isNotTabbable={props.isTriggerNotTabbable}
              isOpened={props.isOpen}
              onActivate={this.handleTriggerActivation}
              shouldFitContainer={props.shouldFitContainer}
            >{props.trigger}</Trigger>
          </div>
        </Layer>
      </div>
    );
  }
}
