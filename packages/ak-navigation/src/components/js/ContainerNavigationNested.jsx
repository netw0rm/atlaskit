import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerNavigationNested.less';
import { containerNavigationNestedPageSpacing } from '../../shared-variables';

function wrapPages(pages, selectedIndex, selectedPageRef) {
  return pages.map((page, i) => {
    const isSelected = selectedIndex === i;
    return (<div
      aria-hidden={!isSelected}
      className={styles.pageWrapper}
      key={i}
    >
      <div
        ref={isSelected ? selectedPageRef : null}
      >
        {page}
      </div>
    </div>);
  });
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

  constructor(props) {
    super(props);
    this.state = {
      height: 'auto',
    };
  }

  selectedPageRef = (ref) => {
    if (!ref) {
      return;
    }
    this.setState({
      height: ref.offsetHeight,
    });
  }

  render() {
    const { pages } = this.props;
    const selectedIndex = Math.min(pages.length - 1, Math.max(0, this.props.selectedIndex));
    return (
      <div
        className={styles.containerNavigationNested}
        style={{
          transform: `translateX(calc(${-selectedIndex * 100}% + ${-selectedIndex * containerNavigationNestedPageSpacing}px))`,
          height: this.state.height,
        }}
      >
        {wrapPages(pages, selectedIndex, this.selectedPageRef)}
      </div>
    );
  }
}
