import React, { Component, PropTypes } from 'react';
import styles from 'style!../less/ContainerItem.less';
import className from 'classnames';
import ContainerQuery from 'react-container-query';
import {
  containerClosedWidth,
} from '../../shared-variables';

// eslint-disable-next-line react/prefer-stateless-function
export default class ContainerItem extends Component {
  static get propTypes() {
    return {
      text: PropTypes.node,
      icon: PropTypes.node,
      isSelected: PropTypes.bool,
    };
  }

  render() {
    return (
      <ContainerQuery
        query={{
          [styles.closed]: {
            maxWidth: containerClosedWidth,
          },
        }}
      >
        <div
          className={className(styles.containerItemOuter, {
            [styles.isSelected]: this.props.isSelected,
          })}
        >
          <div
            className={styles.containerItemInner}
          >
            {this.props.icon ?
              <div className={styles.icon}>{this.props.icon}</div> : null}
            <div className={styles.text}>{this.props.text}</div>
          </div>
        </div>
      </ContainerQuery>
    );
  }
}
