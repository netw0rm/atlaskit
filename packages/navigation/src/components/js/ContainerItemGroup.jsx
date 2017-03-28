import React, { PureComponent, PropTypes } from 'react';
import style from 'style!../less/ContainerItemGroup.less';
import className from 'classnames';

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
      <div className={style.title}><span>{title}</span></div>
    : null);

    return (
      <div
        className={className({
          [style.noHeaderContent]: !(title || action || hasSeparator),
        })}
      >
        {hasSeparator ? (
          <div
            className={className(style.separator, {
              [style.hasGlobalAppearance]: appearance === 'global',
              [style.hasSettingsAppearance]: appearance === 'settings',
            })}
          />
          ) : null}
        {title || action ? (
          <div className={style.header}>
            <Title />
            {this.props.action ?
              <div className={style.action}>
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
