import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/ContainerItem.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class ContainerItem extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      icon: PropTypes.node,
      url: PropTypes.string,
      linkComponent: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      linkComponent: (url, children) => <a href={url}>{children}</a>,
    };
  }

  render() {
    const Link = p => this.props.linkComponent(p.url, p.children);
    return (
      <Link url={this.props.url}>
        <style>{styles.toString()}</style>
        <div className={classNames(styles.locals.containerItem)}>
          {this.props.icon} {this.props.text}
        </div>
      </Link>
    );
  }
}
