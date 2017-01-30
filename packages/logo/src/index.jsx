import React from 'react';
import AtlassianLogoText from 'babel-loader!svg-to-jsx-loader!./logos/atlassian.svg';
import BitbucketLogoText from 'babel-loader!svg-to-jsx-loader!./logos/bitbucket.svg';
import ConfluenceLogoText from 'babel-loader!svg-to-jsx-loader!./logos/confluence.svg';
import HipchatLogoText from 'babel-loader!svg-to-jsx-loader!./logos/hipchat.svg';
import JiraLogoText from 'babel-loader!svg-to-jsx-loader!./logos/jira.svg';
import Logo from './Logo';

const AtlassianLogo = props =>
  (<Logo logoText={<AtlassianLogoText />} {...props} />);
const BitbucketLogo = props =>
  (<Logo logoText={<BitbucketLogoText />} {...props} />);
const ConfluenceLogo = props =>
  (<Logo logoText={<ConfluenceLogoText />} {...props} />);
const HipchatLogo = props =>
  (<Logo logoText={<HipchatLogoText />} {...props} />);
const JiraLogo = props =>
  (<Logo logoText={<JiraLogoText />} {...props} />);

export default AtlassianLogo;
export { AtlassianLogo, BitbucketLogo, ConfluenceLogo, HipchatLogo, JiraLogo };
