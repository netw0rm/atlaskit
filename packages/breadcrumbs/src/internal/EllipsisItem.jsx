import React, { PropTypes, PureComponent } from 'react';
import Button from '@atlaskit/button';
import styles from '../styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class EllipsisItem extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={styles.item} onClick={this.props.onClick}>
        <Button
          className={styles.itemButton}
          appearance="link"
          spacing="compact"
          href="#"
        >...</Button>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
