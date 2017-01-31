import React from 'react';
import Icon from '../../Icon';

class EmojiFoodIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-yc1s9sd"><title id="title-yc1s9sd">{title}</title><path d="M9.425 4.798v.005L9.271 7H4.995a.881.881 0 0 0-.885.999L5.319 19c.06.552.556.999 1.108.999H17.99A2.006 2.006 0 0 0 20 18v-3.99A3.998 3.998 0 0 0 16.004 10H13.56l.294-2.001c.08-.552-.3-.999-.85-.999h-1.728l.075-1.07 3.002.21a1 1 0 0 0 1.058-.928.993.993 0 0 0-.919-1.067l-4.008-.28a1 1 0 0 0-1.059.933zM18 15v-1.002A2 2 0 0 0 16.002 12h-4.004A1.993 1.993 0 0 0 10 13.998V15h8zm0 2v1h-8v-1h8zm-6.111-6.999L12 9H6l1 9h1v-3.99A4.008 4.008 0 0 1 11.889 10z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EmojiFoodIcon;
