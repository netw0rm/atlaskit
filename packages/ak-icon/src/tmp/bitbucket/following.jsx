import React from 'react';
import Icon from '../../Icon';

class BitbucketFollowingIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="15" height="18" viewBox="0 0 15 18" focusable="false" {...iconProps} aria-labelledby="title-sk0gnef"><title id="title-sk0gnef">{title}</title><path d="M6 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4m3 7H3a3 3 0 0 0-3 3v3.7A9.07 9.07 0 0 0 5.9 18a9 9 0 0 0 6.1-2.4V12a3 3 0 0 0-3-3m0 2a.94.94 0 0 1 1 1v2.6a7.39 7.39 0 0 1-4.1 1.3A6.67 6.67 0 0 1 2 14.7V12a.94.94 0 0 1 1-1h6m5.84-7a1 1 0 0 1-.29.71L13.2 6l1.3 1.32a1 1 0 1 1-1.41 1.41l-2-2a1 1 0 0 1 0-1.41l2.06-2.06a1 1 0 0 1 1.69.74z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketFollowingIcon;
