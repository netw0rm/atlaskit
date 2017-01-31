import React from 'react';
import Icon from '../../Icon';

class EmojiCustomIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-v3awhe8"><title id="title-v3awhe8">{title}</title><path d="M13 11V7.002a.999.999 0 1 0-2 0V11H7.002a.999.999 0 1 0 0 2H11v3.998a.999.999 0 1 0 2 0V13h3.998a.999.999 0 1 0 0-2H13z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EmojiCustomIcon;
