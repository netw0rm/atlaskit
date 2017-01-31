import React from 'react';
import Icon from '../../Icon';

class BitbucketTeamsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="18" viewBox="0 0 18 18" focusable="false" {...iconProps} aria-labelledby="title-we18iln"><title id="title-we18iln">{title}</title><g fill="currentColor" fillRule="evenodd"><path d="M16 15a5.44 5.44 0 0 1-6 .05V12.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V15zm-.5-5h-5A2.5 2.5 0 0 0 8 12.5V16a7.52 7.52 0 0 0 5 2 7.54 7.54 0 0 0 5-2.07V12.5a2.5 2.5 0 0 0-2.5-2.5zM13 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0 4a3 3 0 1 0 0-6 3 3 0 0 0 0 6M5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0 4a3 3 0 1 0 0-6 3 3 0 0 0 0 6" role="presentation"/><path d="M7.5 7h-5A2.5 2.5 0 0 0 0 9.5v2.35a7.63 7.63 0 0 0 5 2.09 7.42 7.42 0 0 0 2-.29v-2.12a5.36 5.36 0 0 1-5-.46V9.5a.5.5 0 0 1 .5-.5h7.45A2.5 2.5 0 0 0 7.5 7" role="presentation"/></g></svg>);
    };
  }
}

export default BitbucketTeamsIcon;
