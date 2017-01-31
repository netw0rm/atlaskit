import React from 'react';
import Icon from '../../Icon';

class EditorBoldIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-pja8v2q"><title id="title-pja8v2q">{title}</title><path d="M7 9.025h3.53c.504 0 1.893-.394 1.893-1.897C12.423 5.624 11 5.5 10.43 5.5H7v3.525zM5 4h5.832c1.076 0 1.938.246 2.588.74.65.492.975 1.238.975 2.235 0 .605-.148 1.123-.445 1.554-.297.432-.72.765-1.27 1 .74.19 1.3.541 1.681 1.084.381.544.639 1.07.639 1.887 0 .47-.151 1.066-.32 1.475a2.689 2.689 0 0 1-.79 1.059c-.358.297-.817.532-1.377.705-.56.174-1.227.261-2 .261H5V4zm2 10.254h4c1 0 2.024-.679 2.024-1.877 0-1.357-1.128-1.877-2.024-1.877H7v3.754z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EditorBoldIcon;
