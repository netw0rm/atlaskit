import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import { appearanceEnum, themeVariables, getFromOuterTheme } from '../../utils/theme';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupInner from '../styled/NavigationItemGroupInner';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';

const getBackground = getFromOuterTheme(themeVariables.appearance, appearanceEnum.container);

export default class NavigationItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
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
      isCompact,
    } = this.props;

    const Title = () => (title ?
      <NavigationItemGroupTitle>{title}</NavigationItemGroupTitle>
    : null);

    const Action = () => (action ?
      <NavigationItemGroupAction>
        {this.props.action}
      </NavigationItemGroupAction>
    : null);

    return (
      <ThemeProvider
        theme={outerTheme => ({
          [themeVariables.appearance]: getBackground(outerTheme),
          [themeVariables.isCompact]: isCompact,
        })}
      >
        <NavigationItemGroupInner hasHeaderContent={(title || action || hasSeparator)}>
          {hasSeparator ? (
            <NavigationItemGroupSeparator />
          ) : null}
          {title || action ? (
            <NavigationItemGroupHeader>
              <Title />
              <Action />
            </NavigationItemGroupHeader>) : null
          }
          <div>
            {this.props.children}
          </div>
        </NavigationItemGroupInner>
      </ThemeProvider>
    );
  }
}
