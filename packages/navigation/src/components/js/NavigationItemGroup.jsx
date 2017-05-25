import React, { PureComponent, PropTypes } from 'react';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupInner from '../styled/NavigationItemGroupInner';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';

export default class NavigationItemGroup extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    children: PropTypes.node,
    hasSeparator: PropTypes.bool,
    title: PropTypes.string,
  }

  render() {
    const {
      title,
      action,
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

    return (
      <NavigationItemGroupInner hasHeaderContent={(title || action || hasSeparator)}>
        {hasSeparator ? (
          <NavigationItemGroupSeparator />
        ) : null}
        {title || action ? (
          <NavigationItemGroupHeader>
            {wrappedTitle}
            {wrappedAction}
          </NavigationItemGroupHeader>) : null
        }
        <div>
          {this.props.children}
        </div>
      </NavigationItemGroupInner>
    );
  }
}
