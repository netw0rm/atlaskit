import React, { PropTypes, PureComponent } from 'react';
import Button from '@atlaskit/button';
import styles from 'style!../less/Flag.less';
import CrossIcon from '@atlaskit/icon/glyph/cross';

// eslint-disable-next-line react/prefer-stateless-function
export default class Flag extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    description: PropTypes.string,
    icon: PropTypes.element.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isDismissAllowed: PropTypes.bool,
    onDismissed: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    actions: [],
    isDismissAllowed: false,
    onDismissed: () => {},
  }

  flagDismissed = () => {
    this.props.onDismissed(this.props.id);
  }

  renderActions = () => {
    if (!this.props.actions.length) return null;

    const items = this.props.actions.map((action, index) => (
      <div className={styles.actionsItem} key={index}>
        <Button
          appearance="link"
          className={styles.actionButton}
          onClick={action.onClick}
          spacing="none"
        >
          {action.content}
        </Button>
      </div>
    ));

    return <div className={styles.actionsContainer}>{items}</div>;
  }

  render() {
    return (
      <div
        className={styles.root}
        role="alert"
        tabIndex="0"
      >
        <div className={styles.primaryIcon}>
          {this.props.icon}
        </div>
        <div className={styles.textContent}>
          <div className={styles.titleAndDismiss}>
            <span className={styles.title}>
              {this.props.title}
            </span>
            {
              this.props.isDismissAllowed ? (
                <button
                  className={styles.dismissIconButton}
                  onClick={this.flagDismissed}
                >
                  <CrossIcon label="Dismiss flag" />
                </button>
              ) : null
            }
          </div>
          {
            this.props.description ? (
              <div className={styles.description}>
                {this.props.description}
              </div>
            ) : null
          }
          { this.renderActions() }
        </div>
      </div>
    );
  }
}
