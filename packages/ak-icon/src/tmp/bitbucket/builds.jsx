import React from 'react';
import Icon from '../../Icon';

class BitbucketBuildsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="16" height="16" viewBox="92 327 16 16" focusable="false" {...iconProps} aria-labelledby="title-r071ssh"><title id="title-r071ssh">{title}</title><g fill="none" stroke="currentColor" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M106.277 341.635h-3.613v-3.613" role="presentation"/><path d="M102.667 329a6.506 6.506 0 0 1 4.333 6.132c0 2.831-1.78 5.549-4.304 6.442m-8.797-12.223h3.612v3.613" role="presentation"/><path d="M97.511 341.986a6.505 6.505 0 0 1-4.334-6.132c0-2.83 1.78-5.549 4.305-6.442" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketBuildsIcon;
