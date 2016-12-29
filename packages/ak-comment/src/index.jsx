import React, { PropTypes, PureComponent } from 'react';
import Button from 'ak-button';
import Lozenge from 'ak-lozenge';

import styles from 'style!./styles.less';

export default class extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    author: PropTypes.string,
    avatar: PropTypes.node.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    datetime: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    actions: [],
  }

  renderTopItems = () => (
    ([
      this.props.author || null,
      this.props.type ? <Lozenge>{this.props.type}</Lozenge> : null,
      this.props.datetime || null,
    ])
    .filter(item => !!item)
    .map((item, index) => <div key={index} className={styles.topItem}>{item}</div>)
  )

  renderActions = () => (
    this.props.actions.map((action, index) => (
      <div key={index} className={styles.actionsItem}>
        <Button
          appearance="subtle"
          onClick={action.onClick}
          spacing="none"
        >
          {action.content}
        </Button>
      </div>
    ))
  )

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.avatarContainer}>
            {this.props.avatar}
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.topContainer}>
            {this.renderTopItems()}
          </div>
          <div className={styles.contentContainer}>
            {this.props.content}
          </div>
          <div className={styles.actionsContainer}>
            {this.renderActions()}
          </div>
        </div>
      </div>
    );
  }
}
