import React from 'react';
import Icon from '../../Icon';

class BitbucketPullrequestsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-s2x7mfv"><title id="title-s2x7mfv">{title}</title><path d="M16 13.2V9c0-1.7-1.3-3-3-3h-1.9l.8-.8c.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0L8.5 6.4c-.3.4-.3.9 0 1.2l2.3 2.3c.2.2.3.2.5.2s.4-.1.6-.3c.3-.3.3-.8 0-1.1l-.7-.7H13c.6 0 1 .4 1 1v4.2c-1.2.4-2 1.5-2 2.8 0 1.7 1.3 3 3 3s3-1.3 3-3c0-1.3-.8-2.4-2-2.8zM15 17c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM5 1C3.4 1 2 2.3 2 4c0 1.3.8 2.4 2 2.8V18c0 .6.4 1 1 1s1-.4 1-1V6.8C7.2 6.4 8 5.3 8 4c0-1.7-1.3-3-3-3zm0 4c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketPullrequestsIcon;
