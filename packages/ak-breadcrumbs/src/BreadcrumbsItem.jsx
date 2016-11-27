import React, { PureComponent, PropTypes } from 'react';
import Button from 'ak-button';

import styles from './styles.less';


/**
 * @description BreadcrumbsItem React component.
 * @class BreadcrumbsItem
 * @example @js import { AkBreadcrumbsItem } from 'ak-breadcrumbs';
 * ReactDOM.render(<AkBreadcrumbsItem />);
 */
/* eslint-disable-next-line react/prefer-stateless-function */
export default class BreadcrumbsItem extends PureComponent {
  static propTypes = {
    /**
     * @description The target URL.
     * @memberof BreadcrumbsItem
     * @instance
     * @type {string}
     */
    href: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }
  static defaultProps = {
    href: '#',
  }
  render() {
    return (
      <div className={styles.locals.item}>
        <Button appearance="link" spacing="compact" href={this.props.href}>
          {this.props.children}
        </Button>
      </div>
    );
  }
}
