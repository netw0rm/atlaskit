/**
 * Components that displays user avatar + logged in links if user is logged
 * or a logIn link if the user is not logged.
 */
import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';
import cx from 'classnames';
import { Link, LoginList, AvatarElementWrapper, AvatarWrapper, UserInfoWrapper, UserInfo, UserName, UserEmail, UserInfoItem, ListLink } from './styled';

const path = [window.location.pathname, window.location.search, window.location.hash].join('');
const logInUrl = `/account/login?returnTo=${encodeURIComponent(path)}`;

const StyledDiv = styled.div`
  display: flex;
`;

class LogIn extends Component {

  static propTypes = {
    showLoginButton: PropTypes.bool,
    userInfo: PropTypes.shape({
      avatarUrl: PropTypes.string,
      screenName: PropTypes.string,
      email: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      showUserInfo: false,
    };
  }

  toggleUserInfo = () => {
    this.setState({ showUserInfo: !this.state.showUserInfo });
  };

  renderAvatar() {
    const { showUserInfo } = this.state;
    const { avatarUrl } = this.props.userInfo;
    const logInLinks = showUserInfo ? this.renderLogInLinks() : null;
    const avatarClass = cx({ active: showUserInfo });

    return (
      <AvatarWrapper>
        <AvatarElementWrapper className={avatarClass} onClick={this.toggleUserInfo}>
          <Avatar size="small" src={avatarUrl} />
        </AvatarElementWrapper>
        {logInLinks}
      </AvatarWrapper>
    );
  }

  renderUserInfo() {
    const { avatarUrl, screenName, email } = this.props.userInfo;

    return (
      <UserInfoWrapper>
        <Avatar size="medium" src={avatarUrl} />
        <UserInfo>
          <UserName>{screenName}</UserName>
          <UserEmail>{email}</UserEmail>
        </UserInfo>
      </UserInfoWrapper>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoginLink() {
    return <Link href={logInUrl}>Log in</Link>;
  }

  renderLogInLinks() {
    return (
      <LoginList>
        <UserInfoItem>{this.renderUserInfo()}</UserInfoItem>
        <ListLink><a href="/apps/">My Apps</a></ListLink>
        <ListLink><a href="/account/logout">Log out</a></ListLink>
      </LoginList>
    );
  }

  render() {
    const { userInfo, showLoginButton } = this.props;

    if (userInfo) {
      return <StyledDiv>{ this.renderAvatar() }</StyledDiv>;
    }

    if (showLoginButton) {
      return <StyledDiv>{ this.renderLoginLink() }</StyledDiv>;
    }

    return null;
  }
}

export default LogIn;
