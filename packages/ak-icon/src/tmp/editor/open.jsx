import React from 'react';
import Icon from '../../Icon';

class EditorOpenIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-nw11wyw"><title id="title-nw11wyw">{title}</title><path d="M11.207 10.207L6.464 14.95 5.05 13.536l4.743-4.743L7 6h7v7l-2.793-2.793z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorOpenIcon;
