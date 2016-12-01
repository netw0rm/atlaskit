import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';

import styles from 'style!./styles.less';
import BreadcrumbsItem from './BreadcrumbsItem';
import {
  countItems,
  renderItems,
  EllipsisItem,
} from './internal/helpers';
import { numItemsToTruncate } from './internal/constants';


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
     * @type {BreadcrumbsItem|BreadcrumbsItem[]}
     */
    items: PropTypes.oneOfType([
      PropTypes.shape({ type: PropTypes.oneOf([BreadcrumbsItem]) }),
      PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([BreadcrumbsItem]) })),
    ]),
  }

  static defaultProps = {
    items: [],
  }

  constructor() {
    super();
    this.state = { expanded: false };
  }

  render() {
    const isExpanded = this.state.expanded || countItems(this) < numItemsToTruncate;
    const classes = classnames(styles.container, {
      [styles.collapsed]: !isExpanded,
    });
    return (
      <div className={classes}>
        {renderItems(this.props.items,
          <EllipsisItem key="ellipsis" onClick={() => this.setState({ expanded: true })} />)
        }
      </div>
    );
  }
}

export { BreadcrumbsItem as AkBreadcrumbsItem };
