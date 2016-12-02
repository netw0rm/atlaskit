import React, { PureComponent } from 'react';
import Button from 'ak-button';
import { locals } from '../styles.less';

/**
 * @description Item used to display an ellipsis when a Breadcrumbs component is collapsed.
 * @class EllipsisItem
 * @private
 */
/* eslint-disable react/prefer-stateless-function */
export default class EllipsisItem extends PureComponent {
  render() {
    return (
      <div className={locals.item} {...this.props}>
        <Button
          className={locals.itemButton}
          appearance="link"
          spacing="compact"
          href="#"
        >...</Button>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
