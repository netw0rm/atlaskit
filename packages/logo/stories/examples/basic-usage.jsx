import React from 'react';
import {
  AtlassianLogo,
  BitbucketLogo,
  ConfluenceLogo,
  HipchatLogo,
  JiraLogo,
  JiraCoreLogo,
  JiraServiceDeskLogo,
  JiraSoftwareLogo,
  StatuspageLogo,
  StrideLogo,
} from '@atlaskit/logo';
import styled from 'styled-components';

const LogoSpacer = styled.div`
  margin-right: 8px;
  color: akColorP300,
`;

const logos = [
  AtlassianLogo,
  BitbucketLogo,
  ConfluenceLogo,
  HipchatLogo,
  JiraLogo,
  JiraCoreLogo,
  JiraServiceDeskLogo,
  JiraSoftwareLogo,
  StatuspageLogo,
  StrideLogo,
];

export default (
  logos.map((Logo, logoIndex) => (
    <LogoSpacer key={logoIndex}>
      <Logo />
    </LogoSpacer>
  ))
);
