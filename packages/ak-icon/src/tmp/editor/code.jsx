import React from 'react';
import Icon from '../../Icon';

class EditorCodeIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-jwnnhs0"><title id="title-jwnnhs0">{title}</title><path d="M7.47 5.47l-4 4-.53.53.53.53 4 4a.75.75 0 0 0 1.06-1.06l-4-4v1.06l4-4a.75.75 0 0 0-1.06-1.06zm4 1.06l4 4V9.47l-4 4a.75.75 0 0 0 1.06 1.06l4-4 .53-.53-.53-.53-4-4a.75.75 0 0 0-1.06 1.06z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorCodeIcon;
