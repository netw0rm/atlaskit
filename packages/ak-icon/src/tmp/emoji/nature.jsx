import React from 'react';
import Icon from '../../Icon';

class EmojiNatureIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-nnlh1r4"><title id="title-nnlh1r4">{title}</title><path d="M13 16h3.625l-2.5-4h1.208L12 7l-3.333 5h1.208l-2.5 4H11v2h2v-2zm4.33-2.06l1.527 2.546A1 1 0 0 1 18 18h-3c-.003 1.105-.9 2-1.998 2h-2.004A1.999 1.999 0 0 1 9 18H6a1 1 0 0 1-.857-1.514L6.67 13.94c-.6-.23-.888-1.068-.484-1.697l5-7.778c.4-.62 1.229-.62 1.628 0l5 7.778c.404.629.117 1.467-.484 1.697z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EmojiNatureIcon;
