import React from 'react';
import Icon from '../../Icon';

class BitbucketLogoIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="24" viewBox="9 8 22 24" focusable="false" {...iconProps} aria-labelledby="title-9ix15mv"><title id="title-9ix15mv">{title}</title><path d="M27.57 24.874c-.16 0-.288.112-.288.112s-2.59 2.034-7.271 2.034c-4.682 0-7.272-2.034-7.272-2.034s-.128-.112-.288-.112c-.19 0-.372.127-.372.408 0 .03.003.06.008.088.402 2.133.696 3.647.748 3.877.35 1.569 3.447 2.753 7.176 2.753s6.825-1.184 7.176-2.753c.051-.23.345-1.744.747-3.877a.474.474 0 0 0 .008-.088c0-.28-.18-.408-.372-.408zM20.018 8C14.228 8 9.5 9.543 9.5 11.459c0 .505 1.263 7.74 1.763 10.61.225 1.287 3.58 3.174 8.752 3.174l.006-.015v.015c5.172 0 8.527-1.887 8.751-3.174.501-2.87 1.764-10.105 1.764-10.61C30.536 9.543 25.808 8 20.018 8zm0 14.919c-1.847 0-3.344-1.484-3.344-3.315 0-1.83 1.497-3.314 3.344-3.314 1.847 0 3.344 1.484 3.344 3.314s-1.497 3.315-3.344 3.315zm1.602-3.372c0 .917-.75 1.66-1.675 1.66a1.668 1.668 0 0 1-1.676-1.66c0-.918.75-1.661 1.676-1.661.925 0 1.675.743 1.675 1.66zm-1.604-7.019c-3.72-.006-6.735-.646-6.733-1.431 0-.785 3.018-1.416 6.738-1.41 3.72.006 6.735.646 6.733 1.431 0 .785-3.018 1.416-6.738 1.41z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default BitbucketLogoIcon;
