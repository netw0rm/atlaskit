import React from 'react';
import Icon from '../Icon';

class SuccessIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="12" height="12" viewBox="0 0 12 12" focusable="false" {...iconProps} aria-labelledby="title-q25ml3w"><title id="title-q25ml3w">{title}</title><g fill="currentColor" fillRule="evenodd"><circle fill="inherit" cx="6" cy="6" r="6" role="presentation"/><path d="M9.287 4.812L5.468 8.63a.75.75 0 0 1-1.06 0L2.71 6.933a.75.75 0 1 1 1.061-1.06L4.938 7.04l3.288-3.288a.75.75 0 1 1 1.06 1.06" fill="#fff" role="presentation"/></g></svg>);
    };
  }
}

export default SuccessIcon;
