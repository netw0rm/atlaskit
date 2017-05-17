/**
 * Components that displays user avatar + logged in links if user is logged
 * or a logIn link if the user is not logged.
 */
import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';
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
    isEnabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    // TODO RAD-162: Move session state to redux store
    this.state = {
      session: {},
      isLogged: null,
      isLoaded: false,
      showUserInfo: false,
    };
  }

  componentDidMount() {
    this.fetchSession();
  }

  fetchSession() {
    const sessionEndpoint = '/account/profile';

    // eslint-disable-next-line
    fetch(sessionEndpoint, {
      method: 'GET',
      credentials: 'include',
    }).then(r => r.json()).then((session) => {
      this.setState({ session, isLogged: true, isLoaded: true });
    }).catch(() => {
      this.setState({ isLogged: false, isLoaded: true });
    });
  }

  toggleUserInfo = () => {
    this.setState({ showUserInfo: !this.state.showUserInfo });
  };

  renderAvatar() {
    const logInLinks = this.state.showUserInfo ? this.renderLogInLinks() : null;
    const avatarClass = cx({ active: this.state.showUserInfo });

    return (
      <AvatarWrapper>
        <AvatarElementWrapper className={avatarClass} onClick={this.toggleUserInfo}>
          <Avatar size="small" src={this.state.session.avatarUrl} />
        </AvatarElementWrapper>
        {logInLinks}
      </AvatarWrapper>
    );
  }

  renderUserInfo() {
    return (
      <UserInfoWrapper>
        <Avatar size="medium" src={this.state.session.avatarUrl} />
        <UserInfo>
          <UserName>{this.state.session.screenName}</UserName>
          <UserEmail>{this.state.session.email}</UserEmail>
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
    if (!this.state.isLoaded) {
      return null;
    }

    if (this.state.isLogged) {
      return <StyledDiv>{ this.renderAvatar() }</StyledDiv>;
    }

    if (this.props.isEnabled) {
      return <StyledDiv>{ this.renderLoginLink() }</StyledDiv>;
    }

    return null;
  }
}

export default LogIn;
