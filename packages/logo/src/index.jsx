/* eslint import/no-unresolved: 0 */

import React from 'react';

// TODO try and use react-svg-loader (it makes the bundle significantly smaller).
import AtlassianLogoText from '!babel-loader!svg-to-jsx-loader!./logos/atlassian.svg';
import BitbucketLogoText from '!babel-loader!svg-to-jsx-loader!./logos/bitbucket.svg';
import ConfluenceLogoText from '!babel-loader!svg-to-jsx-loader!./logos/confluence.svg';
import HipchatLogoText from '!babel-loader!svg-to-jsx-loader!./logos/hipchat.svg';
import JiraLogoText from '!babel-loader!svg-to-jsx-loader!./logos/jira.svg';

import Logo from './Logo';
import {
  atlassianTypeOffset,
  bitbucketTypeOffset,
  confluenceTypeOffset,
  hipchatTypeOffset,
  jiraTypeOffset,
} from './internal/typeOffsetRatios';

const AtlassianLogo = props => (
  <Logo {...props} logoText={<AtlassianLogoText />} typeOffsetRatio={atlassianTypeOffset} />
);

const BitbucketLogo = props => (
  <Logo {...props} logoText={<BitbucketLogoText />} typeOffsetRatio={bitbucketTypeOffset} />
);

const ConfluenceLogo = props => (
  <Logo {...props} logoText={<ConfluenceLogoText />} typeOffsetRatio={confluenceTypeOffset} />
);

const HipchatLogo = props => (
  <Logo {...props} logoText={<HipchatLogoText />} typeOffsetRatio={hipchatTypeOffset} />
);

const JiraLogo = props => (
  <Logo {...props} logoText={<JiraLogoText />} typeOffsetRatio={jiraTypeOffset} />
);

export default AtlassianLogo;
export { AtlassianLogo, BitbucketLogo, ConfluenceLogo, HipchatLogo, JiraLogo };
