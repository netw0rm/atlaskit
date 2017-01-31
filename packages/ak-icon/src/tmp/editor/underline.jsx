import React from 'react';
import Icon from '../../Icon';

class EditorUnderlineIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-r456sic"><title id="title-r456sic">{title}</title><path d="M5 4v6c0 2.916 1.737 5 5 5s5-2.084 5-5V4h-2v6c0 1.884-.93 3-3 3s-3-1.116-3-3V4H5zM4 16h12v1.5H4V16z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorUnderlineIcon;
