import React from 'react';
import Icon from '../Icon';

class ErrorIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="12" height="12" viewBox="0 0 12 12" focusable="false" {...iconProps} aria-labelledby="title-hioaq5p"><title id="title-hioaq5p">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0z" fill="inherit" role="presentation"/><path d="M8.65 7.59a.75.75 0 1 1-1.06 1.061L6 7.061 4.407 8.65a.748.748 0 0 1-1.06 0 .75.75 0 0 1 0-1.06L4.937 6l-1.59-1.59a.75.75 0 0 1 1.06-1.061l1.591 1.59L7.59 3.35a.75.75 0 1 1 1.06 1.06L7.06 6l1.59 1.59z" fill="#fff" role="presentation"/></g></svg>);
    };
  }
}

export default ErrorIcon;
