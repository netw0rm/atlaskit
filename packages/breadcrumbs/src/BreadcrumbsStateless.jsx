import React, { Children, PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import BreadcrumbsItem from './BreadcrumbsItem';
import EllipsisItem from './components/EllipsisItem';
import { defaultMaxItems } from './styled/constants';

const { count, toArray } = Children;

export { BreadcrumbsItem };

export default class BreadcrumbsStateless extends PureComponent {
  static propTypes = {
    isExpanded: PropTypes.bool,
    maxItems: PropTypes.number,
    onExpand: PropTypes.func.isRequired,
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
