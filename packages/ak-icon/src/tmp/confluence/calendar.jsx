import React from 'react';
import Icon from '../../Icon';

class ConfluenceCalendarIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="31 364 18 18" focusable="false" {...iconProps} aria-labelledby="title-ix1qslt"><title id="title-ix1qslt">{title}</title><path fill="currentColor" d="M47 366h-1v2h-3v-2h-6v2h-3v-2h-1c-1.101 0-2 .9-2 2v12c0 1.1.899 2 2 2h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 14H33v-8h14v8zm-10.5-16h-2v3.5h2V364zm9 0h-2v3.5h2V364z" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ConfluenceCalendarIcon;
