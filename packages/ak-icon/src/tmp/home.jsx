import React from 'react';
import Icon from '../Icon';

class HomeIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="32" height="30" viewBox="4 5 32 30" focusable="false" {...iconProps} aria-labelledby="title-udlqshk"><title id="title-udlqshk">{title}</title><path d="M20 35c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15zm-8-15.5c0-.276.153-.653.354-.854l7.292-7.292a.496.496 0 0 1 .708 0l7.292 7.292c.195.195.354.585.354.854v7c0 .276-.228.5-.491.5h-5.018a.488.488 0 0 1-.491-.49V23s-1-1-2-1-2 1-2 1v3.51c0 .27-.228.49-.491.49h-5.018a.5.5 0 0 1-.491-.5v-7z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default HomeIcon;
