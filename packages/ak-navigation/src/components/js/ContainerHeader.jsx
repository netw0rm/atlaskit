import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from 'isomorphic-style-loader!../less/ContainerHeader.less';
import ContainerQuery from 'react-container-query';
import {
  containerOpenWidth,
  containerClosedWidth,
} from '../../shared-variables';

// eslint-disable-next-line react/prefer-stateless-function
class ContainerHeader extends Component {
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

export default withStyles(styles)(ContainerHeader);
