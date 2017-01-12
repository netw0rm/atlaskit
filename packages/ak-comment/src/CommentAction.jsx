import React, { PropTypes, PureComponent } from 'react';
import Button from 'ak-button';
import styles from './styles.less';

export default class CommentAction extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
  }

  render() {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <span
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        <Button
          appearance="link"
          className={styles.locals.actionButton}
          spacing="none"
          type="button"
        >
          {this.props.children}
        </Button>
      </span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
