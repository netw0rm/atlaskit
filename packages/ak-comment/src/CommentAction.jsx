import React, { PropTypes, PureComponent } from 'react';
import Button from 'ak-button';
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
          className={styles.locals.actionButton}
          spacing="none"
          type="button"
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}
