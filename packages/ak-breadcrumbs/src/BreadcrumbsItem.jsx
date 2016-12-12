import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from 'ak-button';
import Tooltip from 'ak-tooltip';
import classnames from 'classnames';
import { locals } from './styles.less';
import { itemTruncateWidth } from './internal/constants';

const { item, itemButton, truncated } = locals;


/**
 * @description BreadcrumbsItem React component.
 * @class BreadcrumbsItem
 * @example @js import { AkBreadcrumbsItem } from 'ak-breadcrumbs';
 * ReactDOM.render(<AkBreadcrumbsItem href="/item">Item</AkBreadcrumbsItem);
 */
export default class BreadcrumbsItem extends PureComponent {
  static propTypes = {
    /**
     * @description The target URL.
     * @memberof BreadcrumbsItem
     * @instance
     * @type {string}
     */
    href: PropTypes.string,
    /**
     * @description The icon to display before the item content.
     * Icons specified in this way will always be displayed, even when the content is truncated.
     * @memberof BreadcrumbsItem
     * @type {element}
     */
    iconBefore: PropTypes.element,
    /**
     * @description The icon to display after the item content.
     * Icons specified in this way will always be displayed, even when the content is truncated.
     * @memberof BreadcrumbsItem
     * @type {element}
     */
    iconAfter: PropTypes.element,
    /**
     * @description The text content of the item.
     * @memberof BreadcrumbsItem
     * @instance
     * @type {string}
     */
    text: PropTypes.string,
  }

  static defaultProps = {
    href: '#',
  }

  constructor() {
    super();
    this.state = {
      hasOverflow: false,
    };
  }

  componentDidMount() {
    this.updateOverflow();
  }

  componentWillReceiveProps() {
    // Reset the state
    this.setState({ hasOverflow: false });
  }

  componentDidUpdate() {
    this.updateOverflow();
  }

  /**
   * @description Update the overflow state.
   * Returns true if overflow is detected, false otherwise.
   * @private
   */
  updateOverflow() {
    if (!this.button) return false;
    // We need to find the DOM node for the button component in order to measure its size.
    const el = ReactDOM.findDOMNode(this.button); // eslint-disable-line react/no-find-dom-node
    const overflow = el.clientWidth >= itemTruncateWidth;
    if (overflow !== this.state.hasOverflow) {
      this.setState({ hasOverflow: overflow });
    }
    return overflow;
  }

  renderButton = () => (
    <Button
      className={itemButton}
      appearance="link"
      iconAfter={this.props.iconAfter}
      iconBefore={this.props.iconBefore}
      spacing="compact"
      href={this.props.href}
      ref={el => (this.button = el)}
    >
      {this.props.text}
    </Button>
  );

  renderButtonWithTooltip = () => (
    <Tooltip
      description={this.props.text}
      position="bottom"
    >
      {this.renderButton()}
    </Tooltip>
  );

  render() {
    const itemClasses = classnames(item, {
      [truncated]: this.state.hasOverflow,
    });
    return (
      <div className={itemClasses}>
        {this.state.hasOverflow
          ? this.renderButtonWithTooltip()
          : this.renderButton()
        }
      </div>
    );
  }
}
