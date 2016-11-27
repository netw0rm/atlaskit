import React, { PureComponent, PropTypes } from 'react';
import styles from './styles.less';

import AKLayer from '../src';


export default class ExampleAlignment extends PureComponent {
  static propTypes = {
    position: PropTypes.string,
    content: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      target: null,
    };
  }

  render() {
    const content = (
      <div className={styles.locals.alignmentContainer}>
        {this.props.content}
      </div>
    );

    return (
      <div>
        <AKLayer {...this.props} target={content}>
          <div style={{ background: '#fca' }}>{this.props.position}</div>
        </AKLayer>
      </div>
    );
  }
}
