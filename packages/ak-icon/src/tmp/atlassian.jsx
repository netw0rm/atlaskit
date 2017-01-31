import React from 'react';
import Icon from '../Icon';

class AtlassianIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="19" viewBox="0 0 20 19" focusable="false" {...iconProps} aria-labelledby="title-sxbrcrm"><title id="title-sxbrcrm">{title}</title><path d="M19.888.246a.473.473 0 0 0-.377-.19.455.455 0 0 0-.218.055C16.52 1.63 13.306 2.432 9.997 2.433 6.69 2.433 3.475 1.629.702.112A.454.454 0 0 0 .484.056a.473.473 0 0 0-.378.19.463.463 0 0 0 .088.641A16.338 16.338 0 0 0 9.996 4.15h.002A16.337 16.337 0 0 0 19.802.886a.462.462 0 0 0 .086-.64zM16.702 4.57a.372.372 0 0 0-.359-.052c-.803.307-1.62.54-2.364.714a.465.465 0 0 0-.326.284C13.11 7.003 11.725 8.418 10.27 9.9c-.058.055-.14.128-.273.128-.132 0-.213-.07-.273-.128-1.454-1.483-2.84-2.893-3.382-4.38a.465.465 0 0 0-.326-.284 18.355 18.355 0 0 1-2.366-.722.375.375 0 0 0-.357.052.372.372 0 0 0-.144.328c.123 1.236.611 2.445 1.493 3.711.828 1.19 1.91 2.293 2.954 3.359 1.926 1.964 3.745 3.819 3.904 5.97a.372.372 0 0 0 .371.344h2.262a.372.372 0 0 0 .372-.39c-.071-1.439-.612-2.879-1.654-4.403-.219-.32-.453-.63-.697-.934a.27.27 0 0 1 .018-.356l.226-.231c1.046-1.066 2.126-2.168 2.955-3.359.882-1.266 1.37-2.468 1.493-3.704a.382.382 0 0 0-.144-.332zM7.57 13.638a.344.344 0 0 0-.264-.113.373.373 0 0 0-.307.174c-.952 1.448-1.443 2.815-1.511 4.188a.377.377 0 0 0 .102.276c.07.074.17.116.271.116h2.258a.375.375 0 0 0 .373-.346c.049-.662.255-1.325.63-2.022a.524.524 0 0 0-.046-.565c-.372-.484-.828-1-1.506-1.708zM10 5.678c.708 0 1.12-.043 1.264-.043a.345.345 0 0 1 .315.482c-.094.251-.523 1.156-1.32 1.931a.364.364 0 0 1-.261.104h-.001a.364.364 0 0 1-.26-.104c-.799-.775-1.227-1.68-1.321-1.931a.345.345 0 0 1 .315-.481c.144 0 .555.042 1.264.042h.004z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default AtlassianIcon;
