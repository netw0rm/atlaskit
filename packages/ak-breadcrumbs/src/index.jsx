import React, { Children, PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import styles from 'style!./styles.less';
import BreadcrumbsItem from './BreadcrumbsItem';
import EllipsisItem from './internal/EllipsisItem';
import { numItemsToTruncate } from './internal/constants';

const { count, toArray } = Children;

/**
 * @description Breadcrumbs React component.
 *
 * The Breadcrumbs component will render a list of slash-separated breadcrumb items, and will
 * automatically truncate the list if there are more than 8 items.
 * @class Breadcrumbs
 * @example @js import Breadcrumbs from 'ak-breadcrumbs';
 * ReactDOM.render(<Breadcrumbs />);
 */
/* eslint-disable react/prefer-stateless-function */
export default class Breadcrumbs extends PureComponent {
  static propTypes = {
    /**
     * @description The items to display.
     *
     * If there are 9 or more items, the list will automatically be truncated to display only the
     * first and last items. Clicking the ellipsis separator item will display all items.
     * @memberof Breadcrumbs
     * @instance
     * @type {node|node[]}
     */
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  constructor() {
    super();
    this.state = { isExpanded: false };
  }

  setExpanded(val) {
    this.setState({ isExpanded: !!val });
    return val;
  }

  renderAllItems() {
    return this.props.children;
  }

  renderFirstAndLast() {
    const itemsToRender = toArray(this.props.children);
    return [
      itemsToRender[0],
      <EllipsisItem key="ellipsis" onClick={() => this.setExpanded(true)} />,
      itemsToRender[itemsToRender.length - 1],
    ];
  }

  render() {
    const containerClasses = classnames(styles.container, {
      [styles.collapsed]: !this.state.isExpanded,
    });
    return (
      <div className={containerClasses}>
        {(this.state.isExpanded || count(this.props.children) < numItemsToTruncate)
          ? this.renderAllItems()
          : this.renderFirstAndLast()
        }
      </div>
    );
  }
}

export { BreadcrumbsItem as AkBreadcrumbsItem };
