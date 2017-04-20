import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';

export default class CommentField extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    extraClasses: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
  }

  render() {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (this.props.href ?
      <a
        href={this.props.href}
        className={classNames(styles.topButtonLink, this.props.extraClasses)}
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        {this.props.children}
      </a>
    :
      <span
        className={classNames(styles.topButtonText, this.props.extraClasses)}
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        {this.props.children}
      </span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
