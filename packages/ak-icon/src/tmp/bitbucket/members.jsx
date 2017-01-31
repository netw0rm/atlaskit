import React from 'react';
import Icon from '../../Icon';

class BitbucketMembersIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="18" viewBox="0 0 18 18" focusable="false" {...iconProps} aria-labelledby="title-6cwr0dg"><title id="title-6cwr0dg">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M9 3C7.3 3 6 4.3 6 6s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3m0 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1" role="presentation"/><path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9m0 2c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7" role="presentation"/><path d="M11.5 10h-5C5.1 10 4 11.1 4 12.5v4c1.4 1 3.1 1.5 5 1.5s3.6-.6 5-1.5v-4c0-1.4-1.1-2.5-2.5-2.5m0 2c.3 0 .5.2.5.5v2.8c-.9.4-2 .7-3 .7s-2.1-.2-3-.7v-2.8c0-.3.2-.5.5-.5h5" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketMembersIcon;
