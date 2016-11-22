import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import styles from '../less/ContainerHeader.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class ContainerHeader extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      logo: PropTypes.element,
    };
  }

  render() {
    return (
      <div className={classNames(styles.locals.containerHeaderWrapper)}>
        <div className={classNames(styles.locals.containerHeader)}>
          <style>{styles.toString()}</style>
          <div className={classNames(styles.locals.logo)}>
            {this.props.logo}
          </div>
          <div className={classNames(styles.locals.text)}> {this.props.text} </div>
        </div>
      </div>
    );
  }
}

