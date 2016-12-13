import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerHeader.less';
import ContainerQuery from 'react-container-query';
import {
  containerOpenWidth,
  containerClosedWidth,
} from '../../shared-variables';

export default class ContainerHeader extends PureComponent {
  static get propTypes() {
    return {
      text: PropTypes.string,
      icon: PropTypes.node,
    };
  }

  render() {
    return (
      <ContainerQuery
        query={{
          [styles.open]: {
            minWidth: containerOpenWidth,
          },
          [styles.closed]: {
            maxWidth: containerClosedWidth,
          },
        }}
      >
        <div className={styles.containerHeaderWrapper}>
          <div className={styles.containerHeader}>
            <div className={styles.icon}>
              {this.props.icon}
            </div>
            <div className={styles.text}> {this.props.text} </div>
          </div>
        </div>
      </ContainerQuery>
    );
  }
}

