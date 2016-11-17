import React, { vdom, Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './ContainerNavigation.less';

export default class ContainerNavigation extends Component {
  render() {
    return (
      <div className={classNames(styles.locals.containerNavigation)}>
        <style>{styles.toString()}</style>
        <style>
          {`
            .${styles.locals.containerNavigation} {
              padding: 0 ${this.props.padding}px;
            }
          `}
        </style>
        C
      </div>
    );
  }
}

ContainerNavigation.propTypes = {
  width: PropTypes.number,
  padding: PropTypes.number,
};

ContainerNavigation.defaultProps = {
  width: 220,
  padding: 10,
};
