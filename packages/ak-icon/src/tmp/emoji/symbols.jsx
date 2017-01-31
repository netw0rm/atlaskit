import React from 'react';
import Icon from '../../Icon';

class EmojiSymbolsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-bft5dld"><title id="title-bft5dld">{title}</title><path d="M12.036 9.5l1.767-1.767a2.5 2.5 0 1 1 3.536 3.535l-5.303 5.303-5.303-5.303a2.5 2.5 0 1 1 3.535-3.536L12.036 9.5zM5.32 12.685l.004.004 6.35 6.35a.508.508 0 0 0 .72 0l6.351-6.35.004-.004.003-.003a4.5 4.5 0 0 0-6.364-6.364l-.003.003-.004.004-.346.347-.347-.347-.004-.004-.003-.003a4.5 4.5 0 1 0-6.364 6.364l.003.003z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EmojiSymbolsIcon;
