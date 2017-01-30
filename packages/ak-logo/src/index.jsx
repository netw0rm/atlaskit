import React, { PropTypes } from 'react';
import AtlassianLogoText from 'babel-loader!svg-to-jsx-loader!./logos/atlassian.svg';
import Logo from './Logo';

const logoPropTypes = {
  isCollapsed: PropTypes.bool,
};

const logoDefaultProps = {
  isCollapsed: false,
};

const AtlassianLogo = props =>
  (<Logo logoText={<AtlassianLogoText />} {...props} />);

AtlassianLogo.propTypes = logoPropTypes;
AtlassianLogo.defaultProps = logoDefaultProps;

export default AtlassianLogo;
