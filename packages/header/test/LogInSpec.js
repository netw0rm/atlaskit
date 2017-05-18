import { mount } from 'enzyme';
import React from 'react';
import LogIn from '../src/LogIn';
import { Link, AvatarElementWrapper, UserName, UserEmail } from '../src/LogIn/styled';

describe('LogIn', () => {
  const screenName = 'Hector';
  const email = 'hzarcogarcia@atlassian.com';
  const userInfo = {
    avatarUrl: '',
    screenName,
    email,
  };

  it('should render log in link when "showLoginButton" is passed', () => {
    const mounted = mount(<LogIn showLoginButton />);

    expect(mounted.find(Link).length).to.equal(1);
  });

  it('should render userInfo when user clicks on avatar', () => {
    const mounted = mount(<LogIn userInfo={userInfo} />);

    mounted.find(AvatarElementWrapper).simulate('click');

    expect(mounted.find(UserName).text()).to.equal(screenName);
    expect(mounted.find(UserEmail).text()).to.equal(email);
  });
});
