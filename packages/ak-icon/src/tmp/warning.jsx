import React from 'react';
import Icon from '../Icon';

class WarningIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-qh90wxy"><title id="title-qh90wxy">{title}</title><g fill="none" fillRule="evenodd"><path d="M17.888 16.524L10.846 2.536a.936.936 0 0 0-1.692 0L2.112 16.524c-.336.67.125 1.476.846 1.476h14.084c.721 0 1.182-.807.846-1.476z" fill="currentColor" role="presentation"/><path d="M10 16a1 1 0 1 1 .001-2.001A1 1 0 0 1 10 16zm1-4c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v5z" fill="#FFF" role="presentation"/></g></svg>);
    };
  }
}

export default WarningIcon;
