import React from 'react';
import Icon from '../../Icon';

class BitbucketIssuesIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-wijumi5"><title id="title-wijumi5">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M17 1H3c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 9H3V3h14v7zm-2 4H5v-1H3v1c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-1h-2v1zm-9 3.2c0 1 .9 1.8 2 1.8h4c1.1 0 2-.8 2-1.8V17H6v.2z" role="presentation"/><path d="M8.3 8.7c.4.4 1 .4 1.4 0l3-3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L9 6.6l-.8-.8c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l1.5 1.5z" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketIssuesIcon;
