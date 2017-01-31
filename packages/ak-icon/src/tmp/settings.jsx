import React from 'react';
import Icon from '../Icon';

class SettingsIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="22" height="22" viewBox="-1 -1 22 22" focusable="false" {...iconProps} aria-labelledby="title-wt4ufd4"><title id="title-wt4ufd4">{title}</title><path d="M18.4 11.9c-.8-.3-1.3-1-1.3-1.9 0-.9.6-1.6 1.3-1.9.2-.1.4-.3.3-.6-.2-.7-.5-1.4-.8-2-.1-.2-.4-.3-.6-.2-.4.2-.8.2-1.3.1-.7-.2-1.2-.7-1.4-1.4-.1-.5-.1-.9.1-1.3.1-.2 0-.5-.2-.6-.6-.3-1.3-.6-2-.8-.2-.1-.5.1-.6.3-.3.8-1 1.3-1.9 1.3-.9 0-1.6-.6-1.9-1.3-.1-.2-.3-.4-.6-.3-.7.2-1.4.5-2 .8-.2.1-.2.4-.2.6.1.4.2.8.1 1.2-.1.7-.7 1.3-1.4 1.5-.4.1-.9.1-1.3-.1-.2-.1-.5 0-.6.2-.4.6-.6 1.3-.8 2 0 .3.1.5.3.6.8.3 1.3 1 1.3 1.9 0 .9-.6 1.6-1.3 1.9-.2.1-.4.3-.3.6.2.5.4 1.1.7 1.7.1.2.4.3.6.2.6-.3 1.3-.3 2.1.2l.3.3c.5.8.5 1.6.2 2.2-.1.2 0 .5.2.6.7.4 1.4.7 2.1.9.2.1.5-.1.6-.3.3-.8 1-1.4 1.9-1.4.9 0 1.6.6 1.9 1.4.1.2.3.4.6.3.7-.2 1.4-.5 2.1-.9.2-.1.3-.4.2-.6-.3-.6-.3-1.4.2-2.2l.3-.3c.8-.5 1.5-.5 2.1-.2.2.1.5 0 .6-.2.3-.6.5-1.2.7-1.8.1-.2-.1-.5-.3-.5zM10 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5c0 2.7-2.2 5-5 5z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default SettingsIcon;
