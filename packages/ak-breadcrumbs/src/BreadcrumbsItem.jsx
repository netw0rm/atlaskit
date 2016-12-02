import React, { PureComponent, PropTypes } from 'react';
import ContainerQuery from 'react-container-query';
import Button from 'ak-button';
import classnames from 'classnames';
import styles from './styles.less';
import { itemTruncateWidth } from './internal/constants';


/**
 * @description BreadcrumbsItem React component.
 * @class BreadcrumbsItem
 * @example @js import { AkBreadcrumbsItem } from 'ak-breadcrumbs';
 * ReactDOM.render(<AkBreadcrumbsItem href="/item">Item</AkBreadcrumbsItem);
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
    const query = {
      [styles.locals.truncated]: { minWidth: itemTruncateWidth },
    };
    return (
      <ContainerQuery
        className={classnames(styles.locals.item, styles.locals.collapsibleItem)}
        query={query}
      >
        <span className={styles.locals.tooltipTrigger}>
          <div className={styles.locals.tooltip}>
            {this.props.children}
          </div>
          <Button
            className={styles.locals.itemButton}
            appearance="link"
            spacing="compact"
            href={this.props.href}
          >
            {this.props.children}
          </Button>
        </span>
      </ContainerQuery>
    );
  }
}
