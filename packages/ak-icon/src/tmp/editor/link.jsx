import React from 'react';
import Icon from '../../Icon';

class EditorLinkIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-vpg57o1"><title id="title-vpg57o1">{title}</title><path d="M10.248 7.212l1.061-1.06a1.749 1.749 0 0 1 2.474 0c.685.684.686 1.789.001 2.474l-1.061 1.061-.703.703a1.753 1.753 0 0 1-2.48.004.75.75 0 0 0-1.06 1.061 3.253 3.253 0 0 0 4.6-.005l.703-.702 1.062-1.061a3.247 3.247 0 0 0-.001-4.596 3.249 3.249 0 0 0-4.596 0l-1.06 1.06a.75.75 0 0 0 1.06 1.061zM9.54 12.87l-1.061 1.06a1.749 1.749 0 0 1-2.474 0 1.747 1.747 0 0 1 0-2.474l1.06-1.062.703-.702a1.753 1.753 0 0 1 2.48-.005.75.75 0 0 0 1.06-1.06 3.253 3.253 0 0 0-4.6.004l-.703.703-1.061 1.06a3.247 3.247 0 0 0 0 4.596 3.249 3.249 0 0 0 4.596.001l1.061-1.061a.75.75 0 0 0-1.06-1.06z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorLinkIcon;
