import React, { PureComponent, PropTypes } from 'react';
import Button from 'ak-button';
import Tooltip, { TooltipTrigger } from 'ak-tooltip';
import reactify from 'akutil-react';
import classnames from 'classnames';
import ContainerQuery from 'react-container-query';
import uuid from 'uuid';

import styles from './styles.less';
import { itemTruncateWidth } from './internal/constants';


const ReactTooltip = reactify(Tooltip);
const ReactTrigger = reactify(TooltipTrigger);

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
    /**
     * @description The content to display in the breadcrumbs item.
     *
     * *** Note: *** This must be a single string node.
     * @memberof BreadcrumbsItem
     * @instance
     * @type {string}
     */
    children: PropTypes.string,
  }

  static defaultProps = {
    href: '#',
  }

  constructor() {
    super();
    this.state = {
      id: uuid(),
    };
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
        <ReactTooltip className={styles.locals.tooltip} id={this.state.id} />
        <ReactTrigger description={this.props.children}>
          <span aria-describedby={this.state.id}>
            <Button
              className={styles.locals.itemButton}
              appearance="link"
              spacing="compact"
              href={this.props.href}
            >
              {this.props.children}
            </Button>
          </span>
        </ReactTrigger>
      </ContainerQuery>
    );
  }
}
