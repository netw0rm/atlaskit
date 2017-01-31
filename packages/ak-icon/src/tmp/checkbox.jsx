import React from 'react';
import Icon from '../Icon';

class CheckboxIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="12" height="12" viewBox="0 0 12 12" focusable="false" {...iconProps} aria-labelledby="title-8wk5xjj"><title id="title-8wk5xjj">{title}</title><defs><mask id="a" x="0" y="0" width="12" height="12" fill="#fff"><use/></mask></defs><rect width="12" height="12" rx="2" fill="currentColor" fillRule="evenodd" role="presentation"/><use mask="url(#a)" strokeWidth="2"/><path fill="inherit" d="M9.374 4.914L5.456 8.832a.769.769 0 0 1-1.088 0L2.626 7.091a.769.769 0 1 1 1.088-1.089L4.912 7.2l3.374-3.374a.769.769 0 1 1 1.088 1.088" role="presentation"/></svg>);
    };
  }
}

export default CheckboxIcon;
