import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';

export default class CommentField extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    extraClasses: PropTypes.string,
  }

  render() {
    return (
      <span {...this.props}>
        {this.props.href ?
          <a
            href={this.props.href}
            className={classNames(styles.locals.topButtonLink, this.props.extraClasses)}
          >
            {this.props.children}
          </a> :
          <span className={classNames(styles.locals.topButtonText, this.props.extraClasses)}>
            {this.props.children}
          </span>}
      </span>
    );
  }
}
