import React from 'react';
import Icon from '../Icon';

class ArrowrightlongIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-fuu0vl2"><title id="title-fuu0vl2">{title}</title><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z" role="presentation"/><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 14.828L17.828 12 15 9.172" strokeLinejoin="round" role="presentation"/><path d="M16 12H6" role="presentation"/></g></g></svg>);
    };
  }
}

export default ArrowrightlongIcon;
