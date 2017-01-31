import React from 'react';
import Icon from '../Icon';

class DashboardIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="18" viewBox="32 12 18 18" focusable="false" {...iconProps} aria-labelledby="title-7lwbpoi"><title id="title-7lwbpoi">{title}</title><path d="M48 12H33.99c-1.11 0-1.98.89-1.98 2L32 28c0 1.1.88 2 1.99 2H48c1.1 0 2-.9 2-2V14a2 2 0 0 0-2-2zm-4 12c0 2-1.01 3-3.005 3C39 27 38 26 38 24h-4.01V14H48v10h-4zm-8-4h10v2H36v-2zm0-4h10v2H36v-2z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default DashboardIcon;
