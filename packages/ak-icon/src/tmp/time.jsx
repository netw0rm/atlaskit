import React from 'react';
import Icon from '../Icon';

class TimeIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-cxs79nm"><title id="title-cxs79nm">{title}</title><path d="M11.746 12.889h-.19V5.778h.888V12h4.444v.889h-5.141zM12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default TimeIcon;
