import React from 'react';
import Icon from '../../../Icon';

class EditorListNumberIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-xc5v33m"><title id="title-xc5v33m">{title}</title><path d="M8 6c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H8.997A.996.996 0 0 1 8 6zm0 4c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H8.997A.996.996 0 0 1 8 10zm0 4c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H8.997A.996.996 0 0 1 8 14zm-4-1v1h2.5v-1H4zm0 2v1h2.5v-1H4zm1-9v2h1V5H4v1h1zM4 9v1h1v.5h1V10h.5V9H4zm0 2v1h3v-1H4zm1.5 3H7v1H5.5v-1z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorListNumberIcon;
