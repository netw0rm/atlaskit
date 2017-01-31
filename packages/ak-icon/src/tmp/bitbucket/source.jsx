import React from 'react';
import Icon from '../../Icon';

class BitbucketSourceIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="16" height="20" viewBox="2 0 16 20" focusable="false" {...iconProps} aria-labelledby="title-fy6d2s7"><title id="title-fy6d2s7">{title}</title><path d="M6 9c-.2 0-.5-.1-.7-.3L2.4 5.8c-.4-.4-.4-1.1 0-1.6l3-3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L4.4 5l2.3 2.3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3zm-.5 10c-.2 0-.3 0-.5-.1-.5-.3-.7-.9-.4-1.4l8.5-16c.3-.5.9-.6 1.4-.4.5.3.6.9.4 1.4l-8.5 16c-.2.3-.5.5-.9.5zm7.7-8c.3 0 .5.1.7.3l2.9 2.9c.4.4.4 1.1 0 1.6l-3 3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l2.3-2.3-2.3-2.3c-.4-.4-.4-1 0-1.4.3-.3.6-.4.8-.4z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketSourceIcon;
