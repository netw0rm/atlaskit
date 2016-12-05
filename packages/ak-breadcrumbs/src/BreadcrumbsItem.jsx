import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from 'ak-button';
import classnames from 'classnames';
import { locals } from './styles.less';
import { itemTruncateWidth } from './internal/constants';

const { item, itemButton, tooltip, tooltipTrigger, truncated } = locals;


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
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
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

  updateOverflow() {
    if (this.button) {
      // We need to find the DOM node for the button component in order to measure its size.
      const el = ReactDOM.findDOMNode(this.button); // eslint-disable-line react/no-find-dom-node
      const overflow = el.clientWidth >= itemTruncateWidth;
      if (overflow !== this.state.hasOverflow) {
        this.setState({ hasOverflow: overflow });
      }
    }
  }

  render() {
    const itemClasses = classnames(item, {
      [truncated]: this.state.hasOverflow,
    });
    return (
      <div className={itemClasses}>
        <span className={tooltipTrigger}>
          <div className={tooltip}>
            {this.props.children}
          </div>
          <Button
            className={itemButton}
            appearance="link"
            spacing="compact"
            href={this.props.href}
            ref={el => (this.button = el)}
          >
            {this.props.children}
          </Button>
        </span>
      </div>
    );
  }
}
