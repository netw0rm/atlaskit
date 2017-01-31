import React from 'react';
import Icon from '../../Icon';

class EditorMentionIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-x76w8c2"><title id="title-x76w8c2">{title}</title><path d="M6.877 11H6.01A2.008 2.008 0 0 0 4 13.005V15c0 .556.449 1 1.002 1h9.996c.546 0 1.002-.448 1.002-1v-1.995C16 11.894 15.1 11 13.991 11h-.868A3.993 3.993 0 0 1 10 12.5 3.993 3.993 0 0 1 6.877 11zM10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorMentionIcon;
