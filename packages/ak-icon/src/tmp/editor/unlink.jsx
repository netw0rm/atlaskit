import React from 'react';
import Icon from '../../Icon';

class EditorUnlinkIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-2k2cng8"><title id="title-2k2cng8">{title}</title><path d="M11.31 6.151a1.749 1.749 0 0 1 2.473 0c.685.685.686 1.79.001 2.475l-1.061 1.061-.703.703c-.52.61.496 1.626 1.06 1.06l.703-.702 1.062-1.061a3.247 3.247 0 0 0-.001-4.596 3.249 3.249 0 0 0-4.596 0l-1.06 1.06a.75.75 0 0 0 1.06 1.061l1.061-1.06zm-2.83 7.78a1.749 1.749 0 0 1-2.475-.001 1.747 1.747 0 0 1 0-2.474l1.06-1.062.703-.702C8.48 8.98 7.5 8 6.708 8.632l-.703.702-1.061 1.06a3.247 3.247 0 0 0 0 4.596 3.249 3.249 0 0 0 4.596.001l1.061-1.061a.75.75 0 0 0-1.06-1.06l-1.062 1.06zM3 8h2V7H3v1zm4-5v2h1V3H7zm7.646 12.354l2 2 .708-.708-2-2-.708.708zM15 13h2v-1h-2v1zm-3 2v2h1v-2h-1zM5.354 4.646l-2-2-.708.708 2 2 .708-.708z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorUnlinkIcon;
