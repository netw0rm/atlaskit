import React from 'react';
import Icon from '../../Icon';

class BitbucketBranchesIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-ktho55i"><title id="title-ktho55i">{title}</title><path d="M17 9c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.3.8 2.4 2 2.8V13c0 1.1-.9 2-2 2H8.8c-.3-.9-1-1.5-1.9-1.8V6.8C8.2 6.4 9 5.3 9 4c0-1.7-1.3-3-3-3S3 2.3 3 4c0 1.3.9 2.4 2 2.8v6.4c-1.2.4-2 1.5-2 2.8 0 1.7 1.3 3 3 3 1.3 0 2.4-.8 2.8-2H11c2.2 0 4-1.8 4-4v-1.2c1.2-.4 2-1.5 2-2.8zM6 3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .5-1 1-1zm0 14c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm8-7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketBranchesIcon;
