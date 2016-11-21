import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import styles from '../less/ContainerHeader.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class ContainerHeader extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      url: PropTypes.string,
      logo: PropTypes.element,
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
      <div className={classNames(styles.locals.containerHeaderWrapper)}>
        <Link url={this.props.url}>
          <div className={classNames(styles.locals.containerHeader)}>
            <style>{styles.toString()}</style>
            <div className={classNames(styles.locals.logo)}>
              {this.props.logo}
            </div>
            <div className={classNames(styles.locals.text)}> {this.props.text} </div>
          </div>
        </Link>
      </div>
    );
  }
}

