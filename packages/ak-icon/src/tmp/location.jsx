import React from 'react';
import Icon from '../Icon';

class LocationIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-vdfvv24"><title id="title-vdfvv24">{title}</title><path d="M18 9A6 6 0 1 0 6 9s-.498 3.984 5.96 11.951c.012.05.025.067.04.05.015.017.029 0 .04-.05C18.5 12.984 18 9 18 9zm-6 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default LocationIcon;
