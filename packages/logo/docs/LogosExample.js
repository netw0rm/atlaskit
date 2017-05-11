import React from 'react';
import styled from 'styled-components';

import Logo, {
  AtlassianLogo,
  BitbucketLogo,
  ConfluenceLogo,
  HipchatLogo,
  JiraLogo,
} from '@atlaskit/logo';

const Vert = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoExample = () => (
  <Vert>
    <Logo />
    <AtlassianLogo />
    <BitbucketLogo />
    <ConfluenceLogo />
    <HipchatLogo />
    <JiraLogo />
  </Vert>
);

export default LogoExample;
