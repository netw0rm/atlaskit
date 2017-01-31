import React from 'react';
import Icon from '../Icon';

class HelpIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="18" height="18" viewBox="11 11 18 18" focusable="false" {...iconProps} aria-labelledby="title-5oykoif"><title id="title-5oykoif">{title}</title><path d="M11 20a9 9 0 1 0 18 0 9 9 0 0 0-18 0zm8.858 5.25h-.047c-.733-.023-1.251-.563-1.23-1.286.021-.71.55-1.227 1.26-1.227l.043.001c.753.022 1.265.557 1.244 1.3-.022.713-.542 1.211-1.27 1.211zm3.086-6.124c-.173.244-.552.55-1.03.922l-.527.363c-.288.225-.463.437-.527.645-.053.163-.077.207-.082.54v.084h-2.01l.005-.17c.025-.698.042-1.11.332-1.45.454-.533 1.457-1.18 1.5-1.207a1.56 1.56 0 0 0 .355-.363c.21-.292.304-.52.304-.744a1.45 1.45 0 0 0-.275-.858c-.176-.25-.51-.374-.995-.374-.48 0-.809.152-1.005.465-.202.32-.304.657-.304 1v.087h-2.073l.004-.09c.053-1.268.507-2.183 1.345-2.716.528-.338 1.185-.51 1.95-.51 1.002 0 1.85.244 2.515.724.676.486 1.018 1.216 1.018 2.166 0 .532-.168 1.032-.5 1.486z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default HelpIcon;
