import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupInner from '../styled/NavigationItemGroupInner';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';
import { WithGroupTheme } from '../../theme/util';

export default class NavigationItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    children: PropTypes.node,
    isCompact: PropTypes.bool,
    hasSeparator: PropTypes.bool,
    title: PropTypes.node,
  }

  static defaultProps = {
    isCompact: false,
    hasSeparator: false,
  }

  render() {
    const {
      title,
      action,
      isCompact,
      hasSeparator,
    } = this.props;

    const wrappedTitle = title ?
      <NavigationItemGroupTitle>{title}</NavigationItemGroupTitle>
      : null;

    const wrappedAction = action ?
      (<NavigationItemGroupAction>
        {this.props.action}
      </NavigationItemGroupAction>)
      : null;

    const separator = hasSeparator ? (
      <NavigationItemGroupSeparator />
    ) : null;

    const header = title || action ? (
      <NavigationItemGroupHeader>
        {wrappedTitle}
        {wrappedAction}
      </NavigationItemGroupHeader>
    ) : null;

    return (
      <WithGroupTheme
        isCompact={isCompact}
      >
        <div>
          <NavigationItemGroupInner hasHeaderContent={(separator || header)}>
            {separator}
            {header}
            {this.props.children}
          </NavigationItemGroupInner>
        </div>
      </WithGroupTheme>
    );
  }
}
