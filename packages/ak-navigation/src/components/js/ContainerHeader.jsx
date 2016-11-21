import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import styles from '../less/ContainerHeader.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class ContainerHeader extends Component {
  static get propTypes() {
    return {
      link: PropTypes.element,
      logo: PropTypes.element,
    };
  }

  render() {
    const link = this.props.link;
    const logo = link ? <link.type {...link.props}>{this.props.logo}</link.type> : this.props.logo;
    return (
      <div className={classNames(styles.locals.containerHeader)}>
        <style>{styles.toString()}</style>
        <div className={classNames(styles.locals.logo)}>
          {logo}
        </div>
        <div className={classNames(styles.locals.link)}> {this.props.link} </div>
      </div>
    );
  }
}

