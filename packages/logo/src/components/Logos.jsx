import React from 'react';
import AtlassianLogoText from '../logos/atlassian';
import BitbucketLogoText from '../logos/bitbucket';
import ConfluenceLogoText from '../logos/confluence';
import HipchatLogoText from '../logos/hipchat';
import JiraLogoText from '../logos/jira';
import JiraCoreLogoText from '../logos/jira-core';
import JiraServiceDeskLogoText from '../logos/jira-service-desk';
import JiraSoftwareLogoText from '../logos/jira-software';
import StatuspageLogoText from '../logos/statuspage';
import StrideLogoText from '../logos/stride';
import Logo from './LogoBase';
import {
  atlassianTypeOffset,
  bitbucketTypeOffset,
  confluenceTypeOffset,
  hipchatTypeOffset,
  jiraTypeOffset,
  jiraCoreTypeOffset,
  jiraServiceDeskTypeOffset,
  jiraSoftwareTypeOffset,
  statuspageTypeOffset,
  strideTypeOffset,
} from '../styled/typeOffsetRatios';

export const AtlassianLogo = props => (
  <Logo {...props} typeOffsetRatio={atlassianTypeOffset} >
    <AtlassianLogoText />
  </Logo>
);

export const BitbucketLogo = props => (
  <Logo {...props} typeOffsetRatio={bitbucketTypeOffset} >
    <BitbucketLogoText />
  </Logo>
);

export const ConfluenceLogo = props => (
  <Logo {...props} typeOffsetRatio={confluenceTypeOffset} >
    <ConfluenceLogoText />
  </Logo>
);

export const HipchatLogo = props => (
  <Logo {...props} typeOffsetRatio={hipchatTypeOffset} >
    <HipchatLogoText />
  </Logo>
);

export const JiraLogo = props => (
  <Logo {...props} typeOffsetRatio={jiraTypeOffset} >
    <JiraLogoText />
  </Logo>
);

export const JiraCoreLogo = props => (
  <Logo {...props} typeOffsetRatio={jiraCoreTypeOffset} >
    <JiraCoreLogoText />
  </Logo>
);

export const JiraServiceDeskLogo = props => (
  <Logo {...props} typeOffsetRatio={jiraServiceDeskTypeOffset} >
    <JiraServiceDeskLogoText />
  </Logo>
);

export const JiraSoftwareLogo = props => (
  <Logo {...props} typeOffsetRatio={jiraSoftwareTypeOffset} >
    <JiraSoftwareLogoText />
  </Logo>
);

export const StatuspageLogo = props => (
  <Logo {...props} typeOffsetRatio={statuspageTypeOffset} >
    <StatuspageLogoText />
  </Logo>
);

export const StrideLogo = props => (
  <Logo {...props} typeOffsetRatio={strideTypeOffset} >
    <StrideLogoText />
  </Logo>
);

export default AtlassianLogo;
