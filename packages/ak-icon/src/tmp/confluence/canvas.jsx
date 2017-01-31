import React from 'react';
import Icon from '../../Icon';

class ConfluenceCanvasIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="31 324 19 17" focusable="false" {...iconProps} aria-labelledby="title-99uy1wg"><title id="title-99uy1wg">{title}</title><path fill="currentColor" d="M45.94 324.71c-3.528-1.187-7.066-.962-10.72 1.273-2.853 1.743-4.718 6.076-4.103 9.182.728 3.671 4.351 5.995 9.243 4.651 5.275-1.449 6.55-4.546 6.38-5.334-.17-.788-2.666-1.652-1.719-3.498 1.188-2.313 3.13-1.149 3.982-1.622.855-.472.54-3.442-3.063-4.653zm-3.646 10.705a1.504 1.504 0 0 1-1.843-1.059 1.5 1.5 0 0 1 1.046-1.849 1.503 1.503 0 0 1 1.843 1.06 1.501 1.501 0 0 1-1.046 1.848z" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default ConfluenceCanvasIcon;
