import React, { PropTypes, PureComponent } from 'react';
import Button from 'ak-button';
import classNames from 'classnames';
import styles from './styles.less';

export default class CommentAction extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div {...this.props}>
        <Button
          appearance="link"
          className={classNames(styles.locals.topButton, styles.locals.commentAuthor)}
          spacing="none"
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}
