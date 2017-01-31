import React from 'react';
import Icon from '../Icon';

class ConfirmIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-72rb14u"><title id="title-72rb14u">{title}</title><path d="M15.061 7.707l-5.09 5.091a.999.999 0 0 1-1.415 0l-2.263-2.263a.999.999 0 1 1 1.414-1.414l1.556 1.556 4.384-4.384a.999.999 0 1 1 1.414 1.414" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ConfirmIcon;
