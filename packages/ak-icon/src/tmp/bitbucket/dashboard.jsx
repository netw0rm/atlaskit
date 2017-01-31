import React from 'react';
import Icon from '../../Icon';

class BitbucketDashboardIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-3yi2ol4"><title id="title-3yi2ol4">{title}</title><path d="M17 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.2-.8-2-2-2zM8 4h9v2H8V4zM3 4h3v12H3V4zm14 12H8V8h9v8z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketDashboardIcon;
