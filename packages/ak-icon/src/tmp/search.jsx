import React from 'react';
import Icon from '../Icon';

class SearchIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="17" height="17" viewBox="7 7 17 17" focusable="false" {...iconProps} aria-labelledby="title-m4r5p3o"><title id="title-m4r5p3o">{title}</title><g fill="none" stroke="currentColor" fillRule="evenodd" strokeWidth="2"><path d="M20.172 14.086a6.087 6.087 0 1 1-12.173 0 6.087 6.087 0 0 1 12.173 0z" role="presentation"/><path d="M18.714 18.714l3.497 3.497" strokeLinecap="round" role="presentation"/></g></svg>);
    };
  }
}

export default SearchIcon;
