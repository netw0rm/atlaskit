import React from 'react';
import { JiraLogoIcon } from 'ak-icon';
import JiraLogoText from 'raw-loader!./logoTexts/jira.svg';
import Logo from './Logo';

const JiraLogo = () => (<Logo icon={<JiraLogoIcon />} logoText={JiraLogoText} />);

export default JiraLogo;
