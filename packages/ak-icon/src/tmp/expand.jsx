import React from 'react';
import Icon from '../Icon';

class ExpandIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-vn9moau"><title id="title-vn9moau">{title}</title><path d="M12.584 8.376l-3 2h.832l-3-2a.75.75 0 0 0-.832 1.248l3 2 .416.277.416-.277 3-2a.75.75 0 1 0-.832-1.248z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ExpandIcon;
