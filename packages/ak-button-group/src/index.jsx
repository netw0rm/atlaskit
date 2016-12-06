import React, { PureComponent } from 'react';
import styles from 'style!./styles.less';

/* eslint-disable react/prefer-stateless-function */
/**
 * @description Create instances of the component programmatically, or using markup.
 * @class ButtonGroup
 * @example @js import ButtonGroup from 'ak-button-group';
 */
export default class AkButtonGroup extends PureComponent {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className={styles.wrapper}>
        { this.props.children }
      </div>
    );
  }
}
