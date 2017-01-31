import React from 'react';
import Icon from '../../Icon';

class ConfluencePersonIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-j7tavqa"><title id="title-j7tavqa">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fillOpacity=".2" role="presentation"/><path d="M17.022 17.12A9.968 9.968 0 0 1 10 20a9.968 9.968 0 0 1-7.022-2.88c.708-.455 1.533-.842 2.348-1.193 2.123-.914 2.803-1.685 2.803-3.334 0-.99-.649-.667-.933-2.481-.118-.753-.692-.012-.801-1.729 0-.684.313-.854.313-.854s-.158-1.014-.222-1.793c-.05-.637.223-1.834 1.239-2.59 1.193-.862 3.155-.845 3.488-.505 1.902.535 2.365 2.279 2.3 3.096a29.717 29.717 0 0 1-.221 1.793s.314.17.314.854c-.111 1.717-.684.976-.803 1.729-.285 1.814-.932 1.491-.932 2.481 0 1.65.678 2.42 2.801 3.334.816.351 1.642.737 2.35 1.192z" role="presentation"/></g></svg>);
    };
  }
}

export default ConfluencePersonIcon;
