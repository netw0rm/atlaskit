import React from 'react';
import Icon from '../../Icon';

class EditorImageIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-77y9mmq"><title id="title-77y9mmq">{title}</title><path d="M9 13l-1-1-2 2h8v-1.8L12 10l-3 3zM4 5.002C4 4.45 4.456 4 5.002 4h9.996C15.55 4 16 4.456 16 5.002v9.996C16 15.55 15.544 16 14.998 16H5.002A1.007 1.007 0 0 1 4 14.998V5.002zM7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorImageIcon;
