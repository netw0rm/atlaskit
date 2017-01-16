import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';
import Tab from '../Tab';

export default class TabsNav extends PureComponent {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.instanceOf(Tab)),
  }

  static defaultProps = {
    tabs: [],
  }

  render() {
    /* eslint-disable jsx-a11y/role-supports-aria-props */
    return (
      <ul
        className={styles.locals.akTabLabels}
        role="tablist"
      >
        {
          this.props.tabs.map((tab, index) =>
            // TODO: Handlers for keydown, mousedown, onclick?
             (
               <li
                 aria-posinset={index + 1}
                 aria-selected={tab.props.selected}
                 aria-setsize={this.props.tabs.length}
                 className={classNames(styles.locals.akTabLabel, {
                   [styles.locals.akTabLabelSelected]: tab.props.selected,
                 })}
                 key={index}
                 role="tab"
                 tabIndex={tab.props.selected ? '0' : '-1'}
               >
                 <span>{tab.props.label}</span>
               </li>
            ))
        }
      </ul>
    );
    /* eslint-enable jsx-a11y/role-supports-aria-props */
  }
}
