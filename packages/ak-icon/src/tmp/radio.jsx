import React from 'react';
import Icon from '../Icon';

class RadioIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="12" height="12" viewBox="0 0 12 12" focusable="false" {...iconProps} aria-labelledby="title-8113lgj"><title id="title-8113lgj">{title}</title><path d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12z" fill="currentColor" role="presentation"/><use/><use stroke="currentColor" mask="url(#mask-2)" strokeWidth="2"/><circle cx="6" cy="6" r="2" fill="inherit" role="presentation"/></svg>);
    };
  }
}

export default RadioIcon;
