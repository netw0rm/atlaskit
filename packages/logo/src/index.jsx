import React from 'react';
import AtlassianLogoText from 'babel-loader!svg-to-jsx-loader!./logos/atlassian.svg';
import BitbucketLogoText from 'babel-loader!svg-to-jsx-loader!./logos/bitbucket.svg';
import ConfluenceLogoText from 'babel-loader!svg-to-jsx-loader!./logos/confluence.svg';
import HipchatLogoText from 'babel-loader!svg-to-jsx-loader!./logos/hipchat.svg';
import JiraLogoText from 'babel-loader!svg-to-jsx-loader!./logos/jira.svg';
import Logo from './Logo';

const AtlassianLogo = props =>
  (<Logo {...props} logoText={<AtlassianLogoText />} />);
const BitbucketLogo = props =>
  (<Logo {...props} logoText={<BitbucketLogoText />} />);
const ConfluenceLogo = props =>
  (<Logo {...props} logoText={<ConfluenceLogoText />} />);
const HipchatLogo = props =>
  (<Logo {...props} logoText={<HipchatLogoText />} />);
const JiraLogo = props =>
  (<Logo {...props} logoText={<JiraLogoText />} />);

export default AtlassianLogo;
export { AtlassianLogo, BitbucketLogo, ConfluenceLogo, HipchatLogo, JiraLogo };
