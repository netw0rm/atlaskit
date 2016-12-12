import React, { Children, PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import BreadcrumbsItem from './BreadcrumbsItem';
import EllipsisItem from './internal/EllipsisItem';
import { defaultItemsToCollapse } from './internal/constants';

const { count, toArray } = Children;

export { BreadcrumbsItem };

/**
 * @description Breadcrumbs React component.
 *
 * The Breadcrumbs component will render a list of slash-separated breadcrumb items, and will
 * automatically truncate the list if there are more than 8 items.
 * @class Breadcrumbs
 * @example @js import Breadcrumbs from 'ak-breadcrumbs';
 * ReactDOM.render(<Breadcrumbs />);
 */
export default class BreadcrumbsStateless extends PureComponent {
  static propTypes = {
    /**
     * @description Whether the breadcrumbs should be expanded when there are 9 or more items.
     *
     * If this is true, the breadcrumbs will not collapse and show an ellipsis item.
     * @memberof Breadcrumbs
     * @instance
     * @type {boolean}
     * @default false
     */
    isExpanded: PropTypes.bool,
    /**
     * @description The number of items to display before automatically collapsing the
     * list of breadcrumbs.
     *
     * @memberof Breadcrumbs
     * @instance
     * @type {number}
     * @default 9
     */
    itemsToCollapse: PropTypes.number,
    /**
     * @description Callback that is called when the ellipsis expander item is selected.
     * @memberof Breadcrumbs
     * @instance
     * @type {Function}
     * @required
     */
    onExpand: PropTypes.func.isRequired,
    /**
     * @description The items to display.
     *
     * If there are more than the number of items specified by `itemsToCollapse`, the list will
     * automatically be truncated to display only the first and last items. Clicking the ellipsis
     * separator item will display all the items.
     * @memberof Breadcrumbs
     * @instance
     * @type {node|node[]}
     */
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    isExpanded: false,
    itemsToCollapse: defaultItemsToCollapse,
  }

  renderAllItems() {
    return this.props.children;
  }

  renderFirstAndLast() {
    const itemsToRender = toArray(this.props.children);
    return [
      itemsToRender[0],
      <EllipsisItem key="ellipsis" onClick={this.props.onExpand} />,
      itemsToRender[itemsToRender.length - 1],
    ];
  }

  render() {
    return (
      <div className={styles.container}>
        {(this.props.isExpanded || count(this.props.children) < this.props.itemsToCollapse)
          ? this.renderAllItems()
          : this.renderFirstAndLast()
        }
      </div>
    );
  }
}
