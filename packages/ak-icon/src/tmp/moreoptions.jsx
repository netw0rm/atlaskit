import React from 'react';
import Icon from '../Icon';

class MoreoptionsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-4mr3c99"><title id="title-4mr3c99">{title}</title><path d="M6 10c0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 4 8c-.552 0-1.023.195-1.414.586C2.196 8.976 2 9.448 2 10c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414zm6 0c0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 10 8c-.552 0-1.023.195-1.414.586C8.196 8.976 8 9.448 8 10c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414zm6 0c0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 16 8c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414 0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default MoreoptionsIcon;
