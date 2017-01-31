import React from 'react';
import Icon from '../../Icon';

class BitbucketPipelinesIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="21" viewBox="-1 0 22 21" focusable="false" {...iconProps} aria-labelledby="title-5d7wqgp"><title id="title-5d7wqgp">{title}</title><path d="M6.9 2H3c-.6 0-1 .4-1 1s.4 1 1 1h1.7C3 5.5 2 7.7 2 10c0 3.1 1.8 5.9 4.6 7.2.1.1.3.1.4.1.4 0 .7-.2.9-.6.2-.5 0-1.1-.5-1.3C5.3 14.4 4 12.3 4 10c0-1.7.7-3.3 2-4.5V7c0 .6.4 1 1 1s1-.4 1-1V3.1C8 2.5 7.5 2 6.9 2zM17 15h-.8c1.1-1.4 1.8-3.1 1.8-5 0-3.1-1.8-5.9-4.6-7.2-.4-.2-.8-.3-1.1-.4-.5-.2-1.1.1-1.3.6-.2.5.1 1.1.7 1.2l.9.3c2.1 1 3.4 3.1 3.4 5.4 0 1.7-.7 3.3-2 4.5V12c0-.6-.4-1-1-1s-1 .4-1 1v3.9c0 .6.5 1.1 1.1 1.1H17c.6 0 1-.4 1-1 0-.5-.4-1-1-1z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketPipelinesIcon;
