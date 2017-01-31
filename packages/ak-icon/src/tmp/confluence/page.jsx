import React from 'react';
import Icon from '../../Icon';

class ConfluencePageIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="33 203 14 18" focusable="false" {...iconProps} aria-labelledby="title-9vlfwmy"><title id="title-9vlfwmy">{title}</title><g transform="translate(33 203)"><mask id="a"><rect width="100%" height="100%" fill="#fff" role="presentation"/><rect x="2" y="3" width="6" height="2" rx=".5" role="presentation"/><rect x="2" y="7" width="10" height="2" rx=".5" fillOpacity=".5" role="presentation"/><rect x="2" y="10" width="10" height="2" rx=".5" fillOpacity=".5" role="presentation"/><rect x="2" y="13" width="10" height="2" rx=".5" fillOpacity=".5" role="presentation"/></mask><rect fill="currentColor" width="14" height="18" rx="2" mask="url(#a)" role="presentation"/></g></svg>);
    };
  }
}

export default ConfluencePageIcon;
