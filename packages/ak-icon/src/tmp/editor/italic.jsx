import React from 'react';
import Icon from '../../Icon';

class EditorItalicIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-xmd9v98"><title id="title-xmd9v98">{title}</title><path d="M11.833 5l-1.666 10H12v1H6v-1h2.167L9.833 5H8V4h6v1h-2.167z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorItalicIcon;
