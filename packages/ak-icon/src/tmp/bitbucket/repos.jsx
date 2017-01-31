import React from 'react';
import Icon from '../../Icon';

class BitbucketReposIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="18" viewBox="0 0 18 18" focusable="false" {...iconProps} aria-labelledby="title-ycag9n3"><title id="title-ycag9n3">{title}</title><g transform="translate(1 1)" stroke="currentColor" fill="none" strokeWidth="2" fillRule="evenodd"><rect width="16" height="16" rx="8" role="presentation"/><path d="M5.77 6L4 7.716l1.66 1.61m4.34 0l1.77-1.716L10.11 6" strokeLinecap="round" strokeLinejoin="round" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketReposIcon;
