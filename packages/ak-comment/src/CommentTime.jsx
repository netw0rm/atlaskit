import React, { PropTypes, PureComponent } from 'react';
import Button from 'ak-button';
import styles from './styles.less';

export default class CommentTime extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div {...this.props}>
        <Button
          appearance="link"
          className={styles.locals.topButton}
          spacing="none"
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}
