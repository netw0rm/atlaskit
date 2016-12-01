import React, { Children, PureComponent } from 'react';
import classnames from 'classnames';
import Button from 'ak-button';
import styles from '../styles.less';

const { toArray } = Children;

export const countItems = ref => (ref.props.items ? ref.props.items.length : 0);

export const renderItems = (items, ellipsisItem) => {
  if (items && items.length > 2) {
    const itemsToRender = toArray(items).slice();
    itemsToRender.splice(1, 0, ellipsisItem);
    return itemsToRender;
  }
  return items;
};

/**
 * @description Item used to display an ellipsis when a Breadcrumbs component is collapsed.
 * @class EllipsisItem
 * @private
 */
/* eslint-disable react/prefer-stateless-function */
export class EllipsisItem extends PureComponent {
  render() {
    return (
      <div
        className={classnames(styles.locals.item, styles.locals.ellipsisItem)}
        {...this.props}
      >
        <Button
          className={styles.locals.itemButton}
          appearance="link"
          spacing="compact"
          href="#"
        >...</Button>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
