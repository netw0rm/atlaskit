import React, { PureComponent, PropTypes } from 'react';
import styles from './styles.less';


/**
 * @description Breadcrumbs React component.
 * @class Breadcrumbs
 * @example @js import Breadcrumbs from 'ak-breadcrumbs';
 * ReactDOM.render(<BreadCrumbs />);
 */
/* eslint-disable-next-line react/prefer-stateless-function */
export default class BreadcrumbsItem extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.oneOf([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }
  static defaultProps = {
    href: '#',
  }
  render = () => (
    <div className={styles.item}>
      <a href={this.props.href}>
        {this.props.children}
      </a>
    </div>
  );
}
