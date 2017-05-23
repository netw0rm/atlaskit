import React, { Children, PureComponent, PropTypes } from 'react';
import styles from './styles.less';
import BreadcrumbsItem from './BreadcrumbsItem';
import EllipsisItem from './internal/EllipsisItem';
import { defaultMaxItems } from './internal/constants';

const { count, toArray } = Children;

export { BreadcrumbsItem };

export default class BreadcrumbsStateless extends PureComponent {
  static propTypes = {
    /** Override collapsing of the nav when there are more than maxItems */
    isExpanded: PropTypes.bool,
    /** Set the maximum number of breadcrumbs to display. When there are more
    than the maximum number, only the first and last will be shown, with an
    ellipsis in between. */
    maxItems: PropTypes.number,
    /** A function to be called when you are in the collapsed view and click
    the ellpisis. */
    onExpand: PropTypes.func.isRequired,
    /** A single <AkBreadcrumbsItem> or an array of <AkBreadcrumbsItem>.  */
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    isExpanded: false,
    maxItems: defaultMaxItems,
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
        {(this.props.isExpanded || count(this.props.children) <= this.props.maxItems)
          ? this.renderAllItems()
          : this.renderFirstAndLast()
        }
      </div>
    );
  }
}
