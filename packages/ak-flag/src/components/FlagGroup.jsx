import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!../less/FlagGroup.less';

/**
 * @description Return React FlagGroup component.
 * @class FlagGroup
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class FlagGroup extends PureComponent {
  static propTypes = {
    /**
     * @description The Flag components to display inside the FlagGroup.
     * @memberof FlagGroup
     * @instance
     * @type {element}
     */
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }
}
