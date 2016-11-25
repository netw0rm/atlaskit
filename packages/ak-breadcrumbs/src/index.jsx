import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!./styles.less';
import BreadcrumbsItem from './BreadcrumbsItem';


/**
 * @description Breadcrumbs React component.
 * @class Breadcrumbs
 * @example @js import Breadcrumbs from 'ak-breadcrumbs';
 * ReactDOM.render(<Breadcrumbs />);
 */
/* eslint-disable react/prefer-stateless-function */
export default class Breadcrumbs extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

export { BreadcrumbsItem as AkBreadcrumbsItem };
