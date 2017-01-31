import React from 'react';
import Icon from '../Icon';

class EditIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-lkkkkxq"><title id="title-lkkkkxq">{title}</title><path d="M2.02 17.23a1 1 0 0 0 1.18 1.18l3.81-.78-4.21-4.21-.78 3.81zM17.844 4.707l-2.12-2.12A1.994 1.994 0 0 0 14.307 2c-.51 0-1.023.195-1.414.586l-9.757 9.757 4.95 4.95 9.757-9.758a2 2 0 0 0 0-2.828" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditIcon;
