import React, { PropTypes } from 'react';
import { JiraLogoIcon } from 'ak-icon';
import JiraLogoText from 'babel-loader!svg-to-jsx-loader!./logoTexts/jira.svg';
import Logo from './Logo';

const logoPropTypes = {
  isCollapsed: PropTypes.bool,
};

const logoDefaultProps = {
  isCollapsed: false,
};

const JiraLogo = props =>
  (<Logo icon={<JiraLogoIcon />} logoText={<JiraLogoText />} {...props} />);

JiraLogo.propTypes = logoPropTypes;
JiraLogo.defaultProps = logoDefaultProps;

export default JiraLogo;
