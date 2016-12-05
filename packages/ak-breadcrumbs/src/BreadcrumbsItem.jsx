import React, { PureComponent, PropTypes } from 'react';
import ContainerQuery from 'react-container-query';
import Button from 'ak-button';
import { locals } from './styles.less';

const { item, itemButton, tooltip, tooltipTrigger, truncated } = locals;
const truncateWidth = 200; // Duplicated in styles.less

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
      [truncated]: { minWidth: truncateWidth },
    };
    return (
      <ContainerQuery className={item} query={query}>
        <span className={tooltipTrigger}>
          <div className={tooltip}>
            {this.props.children}
          </div>
          <Button
            className={itemButton}
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
