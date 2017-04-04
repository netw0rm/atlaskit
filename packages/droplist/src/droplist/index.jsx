import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layer from '@atlaskit/layer';
import classnames from 'classnames';
import { akGridSize } from '@atlaskit/util-shared-styles';

import { locals as styles } from '../styles.less';

const halfFocusRing = 1;
const numberOfVisibleItems = 9;
const dropOffset = `0 ${akGridSize}`;

/* eslint-disable react/no-unused-prop-types */
export default class DropdownList extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    shouldFitContainer: PropTypes.bool,
    shouldFlip: PropTypes.bool,
    trigger: PropTypes.node,
  }

  static defaultProps = {
    appearance: 'default',
    children: null,
    isOpen: false,
    shouldFitContainer: false,
    onClick: () => {},
    onKeyDown: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    trigger: null,
    shouldFlip: true,
  }

  componentDidMount = () => {
    if (this.props.shouldFitContainer && this.dropContentRef) {
      this.dropContentRef.style.width = `${this.triggerRef.offsetWidth - (halfFocusRing * 2)}px`;
    }

    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEsc);
  }

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      if (this.props.shouldFitContainer && this.dropContentRef) {
        this.dropContentRef.style.width = `${this.triggerRef.offsetWidth - (halfFocusRing * 2)}px`;
      }
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEsc);
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

    if (!scrollThresholdItem || (scrollThresholdItemIndex < numberOfVisibleItems)) return null;

    return scrollThresholdItem.offsetTop + (scrollThresholdItem.clientHeight / 2);
  }

  handleEsc = (event) => {
    if (event.key === 'Escape') {
      this.close({ event });
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

  close = (attrs) => {
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  render() {
    const { props } = this;

    // items' event delegation
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={classnames([styles.dropWrapper, {
          [styles.fitContainer]: props.shouldFitContainer,
        }])}
        onClick={this.props.onClick}
        onKeyDown={this.props.onKeyDown}
      >
        <Layer
          autoPosition={props.shouldFlip}
          content={props.isOpen ?
            <div
              className={styles.dropContent}
              data-role="droplistContent"
              ref={(ref) => {
                if (ref) {
                  this.dropContentRef = ref;
                  this.setMaxHeight(ref);
                }
              }}
            >
              {props.children}
            </div> :
            null
          }
          offset={dropOffset}
          position={props.position}
        >
          <div
            className={classnames(styles.trigger, {
              [styles.triggerFitContainer]: props.shouldFitContainer,
            })}
            ref={ref => (this.triggerRef = ref)}
          >
            {props.trigger}
          </div>
        </Layer>
      </div>
    );
  }
}
