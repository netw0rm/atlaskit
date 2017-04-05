import React, { PropTypes, PureComponent } from 'react';
import Button from '@atlaskit/button';
import styles from '../styles.less';

// This hack is to make sure that styles.locals exists when style loading is a noop (when we are
// running tests).
// TODO: Remove in AK-2025
styles.locals = styles.locals || {};

/* eslint-disable react/prefer-stateless-function */
export default class EllipsisItem extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={styles.locals.item} onClick={this.props.onClick}>
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
