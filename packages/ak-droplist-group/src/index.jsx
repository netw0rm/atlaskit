import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';


/* eslint-disable react/no-unused-prop-types */
/**
 * @description Group related items together under one heading
 * @class Group
 */
export default class Group extends PureComponent {
  static propTypes = {
    /**
     * @description (Optional) Heading of the group
     * @memberof Group
     * @instance
     * @type {String}
     */
    heading: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    heading: null,
    children: null,
  }

  render = () => {
    const { props } = this;

    return (
      <div
        className={styles.group}
        role="group"
        aria-label={props.heading}
      >
        {props.heading ?
          <div
            className={styles.heading}
            aria-hidden="true"
          >
            {props.heading}
          </div> : null}
        {props.children}
      </div>
    );
  }
}
