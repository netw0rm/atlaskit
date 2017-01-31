import React from 'react';
import Icon from '../../Icon';

class BitbucketDownloadsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-eynstko"><title id="title-eynstko">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M14.8 3.4c-.3 0-.5 0-.8.1C12.9 1.9 11 1 9 1 6.2 1 3.8 2.9 3.1 5.6 1.3 6 0 7.7 0 9.6 0 11.9 1.9 14 4 14h4v-2H4c-1 0-2-1.1-2-2.4 0-1.2.8-2.1 2-2.1h.3c.5 0 .6-.5.6-.5v-.3C5.2 4.5 6.9 3 9 3c1.5 0 3 .8 3.7 2.1l.2.3s.3.5.9.2l.2-.1c.3-.1.6-.1 1-.1 1.6 0 3.1 1.3 3.1 3.1S16.6 12 15 12h-3v2h2.9c2.7 0 5.1-2.6 5.1-5.5s-2.4-5.1-5.2-5.1z" role="presentation"/><path d="M13 15.3c-.3-.3-.8-.3-1.1 0l-.9.9V8.1c0-.6-.4-1-1-1s-1 .4-1 1v8.1l-.9-.9c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l2.4 2.4c.4.3 1 .3 1.3 0l2.4-2.4c.2-.2.2-.4.2-.6 0-.2-.1-.3-.3-.5z" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketDownloadsIcon;
