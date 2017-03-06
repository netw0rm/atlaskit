import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layer from '@atlaskit/layer';
import classnames from 'classnames';

import { locals as styles } from '../styles.less';
import Trigger from '../trigger/index';

const halfFocusRing = 1;
const numberOfVisibleItems = 9;

/* eslint-disable react/no-unused-prop-types */
export default class DropdownList extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    shouldFitContainer: PropTypes.bool,
    isKeyboardInteractionDisabled: PropTypes.bool,
    isTriggerDisabled: PropTypes.bool,
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
    isKeyboardInteractionDisabled: false,
    isTriggerDisabled: false,
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
      this.dropContentRef.style.width = `${this.triggerRef.offsetWidth - (halfFocusRing * 2)}px`;
    }

    document.addEventListener('click', this.handleClickOutside);
  }

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      if (!this.props.isKeyboardInteractionDisabled) {
        this.focusFirstItem();
      }

      if (this.props.shouldFitContainer && this.dropContentRef) {
        this.dropContentRef.style.width = `${this.triggerRef.offsetWidth - (halfFocusRing * 2)}px`;
      }
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setMaxHeight = (dropDomRef) => {
    const { appearance } = this.props;
    const maxHeight = this.getMaxHeight();
    const height = maxHeight ? `${maxHeight}px` : 'none';
    dropDomRef.style.maxHeight = appearance !== 'tall' ? height : 'none';
  }

  getMaxHeight = () => {
    // When dropdown contains more than 9 elemens (droplist items, droplist groups),
    // it should have scroll and cut off half of the 10th item to indicate that there are more
    // items then are seen.
    const items = this.dropContentRef.querySelectorAll('[data-role="droplistGroupHeading"], [data-role="droplistItem"]');
    const scrollThresholdItemIndex = Math.min(items.length, numberOfVisibleItems);
    const scrollThresholdItem = items[scrollThresholdItemIndex - 1];

    if (!scrollThresholdItem) return null;

    // It really should be something like this.dropContentRef.lastChild.offsetBottom,
    // but since there is no offsetBottom method, it's just easier to do it like this
    // since the values are the same.
    const bottomPadding = this.dropContentRef.firstChild.offsetTop;

    return scrollThresholdItemIndex < numberOfVisibleItems ?
      scrollThresholdItem.offsetTop + scrollThresholdItem.clientHeight + bottomPadding :
      scrollThresholdItem.offsetTop + (scrollThresholdItem.clientHeight / 2);
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

    if (this.props.isOpen && !this.props.isKeyboardInteractionDisabled) {
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

  handleTriggerActivation = (attrs) => {
    this.toggle(attrs);
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
    if (this.props.isKeyboardInteractionDisabled && attrs.source === 'keydown') return;

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  render() {
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
              data-role="droplistContent"
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
              isDisabled={props.isTriggerDisabled}
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
