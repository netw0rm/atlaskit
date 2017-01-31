import React from 'react';
import Icon from '../../Icon';

class BitbucketAddonsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-keqanfn"><title id="title-keqanfn">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M10 19c-.3 0-.7-.1-1-.3l-6-3.5c-.6-.4-1-1-1-1.7V6.6c0-.7.4-1.4 1-1.7l6-3.5c.6-.4 1.4-.4 2 0l6 3.5c.6.4 1 1 1 1.7v6.9c0 .7-.4 1.4-1 1.7l-6 3.5c-.3.2-.7.3-1 .3zm0-15.8L4 6.6v6.9l6 3.5 6-3.5.5.9-.5-.9V6.6l-6-3.4z" role="presentation"/><path d="M10 13c-1.6 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.4 3-3 3zm0-4c-.5 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.5-1-1-1z" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketAddonsIcon;
