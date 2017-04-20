import React, { PureComponent, PropTypes } from 'react';
import className from 'classnames';
import styles from '../less/ContainerItemGroup.less';

export default class ContainerItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    children: PropTypes.node,
    title: PropTypes.string,
    hasSeparator: PropTypes.bool,
    appearance: PropTypes.string,
  }

  render() {
    const {
      title,
      action,
      hasSeparator,
      appearance,
    } = this.props;

    const Title = () => (title ?
      <div className={styles.title}><span>{title}</span></div>
    : null);

    return (
      <div
        className={className({
          [styles.noHeaderContent]: !(title || action || hasSeparator),
        })}
      >
        {hasSeparator ? (
          <div
            className={className(styles.separator, {
              [styles.hasGlobalAppearance]: appearance === 'global',
              [styles.hasSettingsAppearance]: appearance === 'settings',
            })}
          />
          ) : null}
        {title || action ? (
          <div className={styles.header}>
            <Title />
            {this.props.action ?
              <div className={styles.action}>
                {this.props.action}
              </div>
            : null}
          </div>) : null
        }
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
