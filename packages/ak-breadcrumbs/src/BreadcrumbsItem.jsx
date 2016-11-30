import React, { PureComponent, PropTypes } from 'react';
import Button from 'ak-button';
import Tooltip, { TooltipTrigger } from 'ak-tooltip';
import ContainerQuery from 'react-container-query';
import reactify from 'akutil-react';
import uuid from 'uuid';

import styles from './styles.less';

const ReactTooltip = reactify(Tooltip);
const ReactTrigger = reactify(TooltipTrigger);

const truncateWidth = 200; // Duplicated in styles.less

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
      [styles.locals.truncated]: { minWidth: truncateWidth },
    };
    return (
      <ContainerQuery className={styles.locals.item} query={query}>
        <div className={styles.locals.tooltipWrapper}>
          <ReactTooltip id={this.state.id} />
        </div>
        <ReactTrigger description={this.props.children}>
          <span aria-describedby={this.state.id}>
            <Button
              appearance="link"
              className={styles.locals.itemButton}
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
