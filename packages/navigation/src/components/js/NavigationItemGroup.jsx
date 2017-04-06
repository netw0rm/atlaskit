import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupInner from '../styled/NavigationItemGroupInner';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';
import { defaultTheme as defaultOuterTheme } from './NavigationItem';

export default class NavigationItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    children: PropTypes.node,
    hasSeparator: PropTypes.bool,
    isCompact: PropTypes.bool,
    title: PropTypes.string,
  }

  static defaultProps = {
    theme: defaultTheme,
  }

  render() {
    const {
      title,
      action,
      hasSeparator,
      isCompact,
    } = this.props;

    const Title = () => (title ?
      <NavigationItemGroupTitle><span>{title}</span></NavigationItemGroupTitle>
    : null);

    return (
      <ThemeProvider
        theme={outerTheme => ({
          NavigationAppearance: (outerTheme || defaultOuterTheme).NavigationAppearance,
          NavigationItemIsCompact: isCompact,
        })}
      >
        <NavigationItemGroupInner hasHeaderContent={(title || action || hasSeparator)}>
          {hasSeparator ? (
            <NavigationItemGroupSeparator />
            ) : null}
          {title || action ? (
            <NavigationItemGroupHeader>
              <Title />
              {this.props.action ?
                <NavigationItemGroupAction>
                  {this.props.action}
                </NavigationItemGroupAction>
              : null}
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

const defaultTheme = {
  NavigationAppearance: 'container',
  NavigationItemIsCompact: false,
};
