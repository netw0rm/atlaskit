import React from 'react';
import Icon from '../../Icon';

class BitbucketProjectsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-o8tmte9"><title id="title-o8tmte9">{title}</title><path d="M17 18H3c-1.2 0-2-.8-2-2V4c0-1.2.8-2 2-2h4.5c.5 0 1 .2 1.4.6L10.4 4H17c1.2 0 2 .8 2 2v10c0 1.2-.8 2-2 2zM3 4v12h14V6h-6.6c-.5 0-1-.2-1.4-.6L7.5 4H3z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketProjectsIcon;
