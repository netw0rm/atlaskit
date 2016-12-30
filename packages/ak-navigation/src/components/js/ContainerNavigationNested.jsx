import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerNavigationNested.less';
import { containerNavigationNestedPageSpacing } from '../../shared-variables';

function wrapPages(pages) {
  return pages.map((page, i) => (<div
    key={i}
    className={styles.pageWrapper}
  >
    {page}
  </div>));
}

export default class ContainerNavigationNested extends PureComponent {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.node),
    selectedIndex: PropTypes.number,
  }

  static defaultProps = {
    selectedIndex: 0,
    pages: [],
  }

  render() {
    const { pages } = this.props;
    const selectedIndex = Math.min(pages.length - 1, Math.max(0, this.props.selectedIndex));
    return (
      <div
        style={{
          transform: `translateX(calc(${-selectedIndex * 100}% + ${-selectedIndex * containerNavigationNestedPageSpacing}px))`,
        }}
        className={styles.containerNavigationNested}
      >
        {wrapPages(pages)}
      </div>
    );
  }
}
