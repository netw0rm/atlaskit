import React from 'react';
import Icon from '../Icon';

class CreateIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="16" height="16" viewBox="7 7 16 16" focusable="false" {...iconProps} aria-labelledby="title-qb1b0xa"><title id="title-qb1b0xa">{title}</title><g fill="currentColor" transform="translate(7 7)" fillRule="evenodd"><rect x="7" width="2" height="16" rx="1" role="presentation"/><rect y="7" width="16" height="2" rx="1" role="presentation"/></g></svg>);
    };
  }
}

export default CreateIcon;
