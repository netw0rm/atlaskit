import React from 'react';
import Icon from '../../Icon';

class BitbucketOptoutIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="18" viewBox="0 0 18 18" focusable="false" {...iconProps} aria-labelledby="title-5072ie1"><title id="title-5072ie1">{title}</title><g fill="none" fillRule="evenodd"><path stroke="currentColor" d="M1 12.328V5.752L5.691 1h6.577L17 5.752v6.576L12.268 17H5.691z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="presentation"/><path d="M7.24 9L5.631 7.391a1.244 1.244 0 1 1 1.76-1.76L9 7.241l1.609-1.61a1.244 1.244 0 1 1 1.76 1.76L10.759 9l1.61 1.609a1.244 1.244 0 1 1-1.76 1.76L9 10.759l-1.609 1.61a1.244 1.244 0 1 1-1.76-1.76L7.241 9z" fill="currentColor" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketOptoutIcon;
