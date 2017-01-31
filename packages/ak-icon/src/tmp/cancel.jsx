import React from 'react';
import Icon from '../Icon';

class CancelIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-gs1sx9i"><title id="title-gs1sx9i">{title}</title><path d="M13.364 11.95a.999.999 0 1 1-1.415 1.413l-2.12-2.12-2.123 2.12a.997.997 0 0 1-1.413 0 1 1 0 0 1 0-1.414l2.12-2.12-2.12-2.122a1 1 0 0 1 1.413-1.414l2.122 2.121 2.122-2.12a.999.999 0 1 1 1.414 1.413l-2.122 2.121 2.121 2.121z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default CancelIcon;
