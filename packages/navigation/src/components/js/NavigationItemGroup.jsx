import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import style from 'style!../less/NavigationItemGroup.less';
import className from 'classnames';

export default class NavigationItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    appearance: PropTypes.string,
    children: PropTypes.node,
    hasSeparator: PropTypes.bool,
    isCompact: PropTypes.bool,
    title: PropTypes.string,
  }

  render() {
    const {
      title,
      action,
      hasSeparator,
      appearance,
      isCompact,
    } = this.props;

    const Title = () => (title ?
      <div className={style.title}><span>{title}</span></div>
    : null);

    return (
      <ThemeProvider
        theme={outerTheme => ({
          NavigationAppearance: outerTheme.NavigationAppearance,
          NavigationItemIsCompact: isCompact,
        })}
      >
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
      </ThemeProvider>
    );
  }
}
