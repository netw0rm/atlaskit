import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import CollapseIcon from '@atlaskit/icon/glyph/editor/expand';
import {AppCardUser} from '../model';
import {Wrapper, User, Title, CollapseButton} from '../styled/HeaderView';

export interface HeaderProps {
  title: string;
  user?: AppCardUser;
  inverse?: boolean;
  contentMaxWidth: number;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export class HeaderView extends React.Component<HeaderProps, {}> {

  renderUser() {
    const {user} = this.props;
    if (!user) {
      return null;
    }
    return (
      <User>
        <Avatar src={user.icon.url} size="small" label={user.icon.label}/>
      </User>
    );
  }

  renderCollapseToggle() {
    const {collapsible, collapsed, onToggleCollapse} = this.props;
    if (!collapsible) {
      return null;
    }
    return (
      <CollapseButton onClick={onToggleCollapse} collapsed={collapsed}>
        <CollapseIcon label="Expand/collapse" size="large"/>
      </CollapseButton>
    );
  }

  render() {
    const {title, inverse, contentMaxWidth} = this.props;
    return (
      <Wrapper contentMaxWidth={contentMaxWidth}>
        {this.renderUser()}
        <Title inverse={inverse}>{title}</Title>
        {this.renderCollapseToggle()}
      </Wrapper>
    );
  }

}
