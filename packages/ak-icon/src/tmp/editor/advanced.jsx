import React from 'react';
import Icon from '../../Icon';

class EditorAdvancedIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-gwv4tuq"><title id="title-gwv4tuq">{title}</title><path d="M12.2 14l.8 2h2l-.763-2H12.2zm.893-3l-1.907-5H8.814l-1.907 5h1.891c.35-1.172.918-3.071 1.202-4l1.2 4h1.893zm-7.33 3L5 16h2l.8-2H5.763zM3 12h14v1H3v-1zM16 2h-3v4h3V5h-2V3h2V2zm0 1h1v2h-1V3z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorAdvancedIcon;
