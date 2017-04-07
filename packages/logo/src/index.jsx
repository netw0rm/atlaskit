import React from 'react';

/* eslint-disable import/no-duplicates */
import AtlassianLogoText from 'babel-loader!svg-to-jsx-loader!./logos/atlassian.svg';
import AtlassianSVGLogo from 'babel-loader!raw-loader!./logos/atlassian-logo.svg';
import BitbucketLogoText from 'babel-loader!svg-to-jsx-loader!./logos/bitbucket.svg';
import BitbucketSVGLogo from 'babel-loader!raw-loader!./logos/bitbucket-logo.svg';
import ConfluenceLogoText from 'babel-loader!svg-to-jsx-loader!./logos/confluence.svg';
import ConfluenceSVGLogo from 'babel-loader!raw-loader!./logos/confluence-logo.svg';
import HipchatLogoText from 'babel-loader!svg-to-jsx-loader!./logos/hipchat.svg';
import HipchatSVGLogo from 'babel-loader!raw-loader!./logos/hipchat-logo.svg';
import JiraLogoText from 'babel-loader!svg-to-jsx-loader!./logos/jira.svg';
import JiraSVGLogo from 'babel-loader!raw-loader!./logos/jira-logo.svg';
/* eslint-enable import/no-duplicates */

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
export {
  AtlassianLogo,
  AtlassianSVGLogo,
  BitbucketLogo,
  BitbucketSVGLogo,
  ConfluenceLogo,
  ConfluenceSVGLogo,
  HipchatLogo,
  HipchatSVGLogo,
  JiraLogo,
  JiraSVGLogo,
};
