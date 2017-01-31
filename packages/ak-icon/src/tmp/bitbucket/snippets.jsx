import React from 'react';
import Icon from '../../Icon';

class BitbucketSnippetsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-wxo6yca"><title id="title-wxo6yca">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M14 7c.8 0 1.6-.3 2.1-.9.6-.6.9-1.3.9-2.1s-.3-1.6-.9-2.1C15 .8 13 .8 11.9 1.9c-.6.5-.9 1.3-.9 2.1s.3 1.5.8 2L10 9.1 8.2 6c.5-.5.8-1.2.8-2s-.3-1.6-.9-2.1C7 .7 5 .7 3.9 1.9 3.3 2.4 3 3.2 3 4s.3 1.6.9 2.1c.6.6 1.3.9 2.1.9h.4l6.7 11.5c.2.3.5.5.9.5.2 0 .3 0 .5-.1.5-.3.6-.9.4-1.4l-3.7-6.4 2.4-4.2c.1.1.3.1.4.1zM6.7 4.7c-.4.4-1 .4-1.4 0-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7zm6.6-1.4c.2-.2.4-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7-.4.4-1 .4-1.4 0-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7z" role="presentation"/><path d="M8.3 12.1l-3.1 5.4c-.3.5-.2 1.1.3 1.3.2.1.3.2.5.2.3 0 .7-.2.9-.5l2.6-4.4-1.2-2z" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketSnippetsIcon;
