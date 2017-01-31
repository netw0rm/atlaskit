import React from 'react';
import Icon from '../../Icon';

class EmojiFlagsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" {...iconProps} aria-labelledby="title-q0khft3"><title id="title-q0khft3">{title}</title><path d="M6 12.577v6.446c0 .537.45.977 1 .977s1-.44 1-.977v-5.778c1.17-.34 2.389-.045 3.768.29.982.238 2.036.495 3.13.495a5.73 5.73 0 0 0 2.547-.567 1 1 0 0 0 .563-.9V5.808a.998.998 0 0 0-1.437-.9c-1.345.654-2.731.317-4.331-.071-1.729-.42-3.687-.895-5.678.072A1 1 0 0 0 6 5.808v6.769zm3.111-1.48c1.094 0 2.148.256 3.129.495 1.381.335 2.6.63 3.768.289V7.178c-1.488.27-2.93-.08-4.24-.398C10.389 6.445 9.17 6.148 8 6.49v4.704a6.195 6.195 0 0 1 1.111-.097z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default EmojiFlagsIcon;
