import React from 'react';
import AtlassianLogoText from '!babel-loader!svg-to-jsx-loader!../logos/atlassian.svg';
import BitbucketLogoText from '!babel-loader!svg-to-jsx-loader!../logos/bitbucket.svg';
import ConfluenceLogoText from '!babel-loader!svg-to-jsx-loader!../logos/confluence.svg';
import HipchatLogoText from '!babel-loader!svg-to-jsx-loader!../logos/hipchat.svg';
import JiraLogoText from '!babel-loader!svg-to-jsx-loader!../logos/jira.svg';
import Logo from './LogoBase';
import {
  atlassianTypeOffset,
  bitbucketTypeOffset,
  confluenceTypeOffset,
  hipchatTypeOffset,
  jiraTypeOffset,
} from '../styled/typeOffsetRatios';

const AtlassianLogo = props => (
  <Logo {...props} typeOffsetRatio={atlassianTypeOffset} >
    <AtlassianLogoText />
  </Logo>
);

const BitbucketLogo = props => (
  <Logo {...props} typeOffsetRatio={bitbucketTypeOffset} >
    <BitbucketLogoText />
  </Logo>
);

const ConfluenceLogo = props => (
  <Logo {...props} typeOffsetRatio={confluenceTypeOffset} >
    <ConfluenceLogoText />
  </Logo>
);

const HipchatLogo = props => (
  <Logo {...props} typeOffsetRatio={hipchatTypeOffset} >
    <HipchatLogoText />
  </Logo>
);

const JiraLogo = props => (
  <Logo {...props} typeOffsetRatio={jiraTypeOffset} >
    <JiraLogoText />
  </Logo>
);

export default AtlassianLogo;
export { AtlassianLogo, BitbucketLogo, ConfluenceLogo, HipchatLogo, JiraLogo };
