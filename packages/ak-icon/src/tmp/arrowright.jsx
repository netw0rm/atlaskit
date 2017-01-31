import React from 'react';
import Icon from '../Icon';

class ArrowrightIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-87nhne8"><title id="title-87nhne8">{title}</title><path d="M8.76 13.65l3-3.5a1 1 0 0 0 0-1.3l-3-3.5a1 1 0 0 0-1.52 1.3l3 3.5v-1.3l-3 3.5a1 1 0 1 0 1.52 1.3z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ArrowrightIcon;
