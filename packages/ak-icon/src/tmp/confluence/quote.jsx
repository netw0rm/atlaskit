import React from 'react';
import Icon from '../../Icon';

class ConfluenceQuoteIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="32 244 16 14" focusable="false" {...iconProps} aria-labelledby="title-96vbg2s"><title id="title-96vbg2s">{title}</title><path d="M35.315 244.401c-1.61 0-2.916 1.343-2.916 3 0 1.656 1.306 3 2.916 3 2.915 0 .972 5.799-2.916 5.799v1.4c6.939.001 9.658-13.199 2.916-13.199zm8.4 0c-1.609 0-2.915 1.343-2.915 3 0 1.656 1.306 3 2.915 3 2.916 0 .973 5.799-2.915 5.799v1.4c6.938.001 9.657-13.199 2.915-13.199z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ConfluenceQuoteIcon;
