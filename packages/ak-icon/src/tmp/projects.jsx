import React from 'react';
import Icon from '../Icon';

class ProjectsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="17" viewBox="32 52 18 17" focusable="false" {...iconProps} aria-labelledby="title-bkksvew"><title id="title-bkksvew">{title}</title><path stroke="#42526E" fill="currentColor" d="M38.563 53h-4.445L34 67.06h14.106V55.013h-7.16z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ProjectsIcon;
