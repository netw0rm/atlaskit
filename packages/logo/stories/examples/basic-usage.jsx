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
import {
  akGridSizeUnitless,
  akColorN700,
  akColorB200,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const LogoSpacer = styled.div`
  margin-right: ${akGridSizeUnitless}px;
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
      <Logo
        textColor={akColorN700}
        iconColor={akColorB200}
        iconGradientStart={akColorB400}
        iconGradientStop={akColorB200}
      />
    </LogoSpacer>
  ))
);
