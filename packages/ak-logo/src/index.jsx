import React from 'react';
import { JiraLogoIcon } from 'ak-icon';
import JiraLogoText from 'babel-loader!svg-to-jsx-loader!./logoTexts/jira.svg';
import Logo from './Logo';

const JiraLogo = () => (<Logo icon={<JiraLogoIcon />} logoText={<JiraLogoText />} />);

export default JiraLogo;
