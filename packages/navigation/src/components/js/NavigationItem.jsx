import React, { PureComponent, PropTypes } from 'react';
// TODO: convert link to styled component
import {
  link,
} from 'style!../less/NavigationItem.less';
import DefaultLinkComponent from './DefaultLinkComponent';
import InteractiveWrapper from './InteractiveWrapper';

import NavigationItemIcon from '../styled/NavigationItemIcon';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import NavigationItemAction from '../styled/NavigationItemAction';
import NavigationItemText from '../styled/NavigationItemText';
import NavigationItemTextAfter from '../styled/NavigationItemTextAfter';
import NavigationItemInner from '../styled/NavigationItemInner';
import NavigationItemMainText from '../styled/NavigationItemMainText';
import NavigationItemOuter from '../styled/NavigationItemOuter';
import NavigationItemSubText from '../styled/NavigationItemSubText';

export default class NavigationItem extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    href: PropTypes.string,
    icon: PropTypes.node,
    // TODO: isCompact and isSelected need to be implemented
    // eslint-disable-next-line
    isCompact: PropTypes.bool,
    // eslint-disable-next-line
    isSelected: PropTypes.bool,
    linkComponent: PropTypes.func,
    onClick: PropTypes.func,
    subText: PropTypes.string,
    text: PropTypes.node,
    textAfter: PropTypes.node,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    linkComponent: DefaultLinkComponent,
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const Icon = () => (this.props.icon ?
      <NavigationItemIcon>
        {this.props.icon}
      </NavigationItemIcon>
    : null);
    const TextAfter = () => (this.props.textAfter ?
      <NavigationItemTextAfter>
        {this.props.textAfter}
      </NavigationItemTextAfter>
    : null);

    const Action = () => (this.props.action ?
      <NavigationItemAction>
        {this.props.action}
      </NavigationItemAction>
    : null);

    const After = ({ children }) => (this.props.textAfter ?
      <NavigationItemAfter>
        {children}
      </NavigationItemAfter>
    : null);

    return (
      <NavigationItemOuter>
        <InteractiveWrapper
          className={link}
          href={this.props.href}
          onMouseDown={this.onMouseDown}
          onClick={this.props.onClick}
          linkComponent={this.props.linkComponent}
        >
          <NavigationItemInner>
            <Icon />
            <NavigationItemText>
              <NavigationItemMainText>
                {this.props.text}
              </NavigationItemMainText>
              <NavigationItemSubText>
                {this.props.subText}
              </NavigationItemSubText>
            </NavigationItemText>
            <After>
              <TextAfter />
            </After>
          </NavigationItemInner>
        </InteractiveWrapper>
        <Action />
      </NavigationItemOuter>
    );
  }
}
