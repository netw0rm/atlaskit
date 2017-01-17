import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';

export default class TabsNav extends PureComponent {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired,
      isSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  render() {
    /* eslint-disable jsx-a11y/role-supports-aria-props, jsx-a11y/no-static-element-interactions */
    return (
      <ul
        className={styles.locals.akTabLabels}
        role="tablist"
      >
        {
          this.props.tabs.map((tab, index) =>
            // TODO: Keyboard nav
             (
               <li
                 aria-posinset={index + 1}
                 aria-selected={tab.isSelected}
                 aria-setsize={this.props.tabs.length}
                 className={classNames(styles.locals.akTabLabel, {
                   [styles.locals.akTabLabelSelected]: tab.isSelected,
                 })}
                 key={index}
                 onClick={tab.onSelect}
                 role="tab"
                 tabIndex={tab.isSelected ? '0' : '-1'}
               >
                 {tab.label}
               </li>
            ))
        }
      </ul>
    );
    /* eslint-enable jsx-a11y/role-supports-aria-props, jsx-a11y/no-static-element-interactions */
  }
}
