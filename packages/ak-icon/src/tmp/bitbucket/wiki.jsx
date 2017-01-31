import React from 'react';
import Icon from '../../Icon';

class BitbucketWikiIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-t3u7du1"><title id="title-t3u7du1">{title}</title><path d="M15 8v9H5V3h6v2.5c0 .8.7 1.5 1.5 1.5H17v-.5c0-.3-.1-.6-.4-.8l-5.1-4.2c-.3-.3-.8-.5-1.2-.5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h-2z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketWikiIcon;
