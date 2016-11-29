import React, { PureComponent, PropTypes } from 'react';
import styles from './styles.less';

import AKLayer from '../src';

// eslint-disable-next-line  react/prefer-stateless-function
export default class ExampleAlignment extends PureComponent {
  static propTypes = {
    position: PropTypes.string,
    targetContent: PropTypes.string,
  }

  render() {
    const popperContent = (<div style={{ background: '#fca' }}>{this.props.position}</div>);

    return (
      <div>
        <AKLayer {...this.props} content={popperContent}>
          <div className={styles.locals.alignmentContainer}>
            {this.props.targetContent}
          </div>
        </AKLayer>
      </div>
    );
  }
}
