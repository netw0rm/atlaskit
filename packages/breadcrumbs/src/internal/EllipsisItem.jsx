import React, { PropTypes, PureComponent } from 'react';
import Button from '@atlaskit/button';
import { locals } from '../styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class EllipsisItem extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={locals.item} onClick={this.props.onClick}>
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
