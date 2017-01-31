import React from 'react';
import Icon from '../Icon';

class FeedbackIcon extends Icon {
  getGlyphTemplate() {
    return (props) => {
      const { label: title } = props;
      const iconProps = {...props};
      delete iconProps.label;

      // eslint-disable-next-line max-len, react/jsx-space-before-closing
      return (<svg width="20" height="20" viewBox="0 0 20 20" focusable="false" {...iconProps} aria-labelledby="title-ae9sgt7"><title id="title-ae9sgt7">{title}</title><path d="M3.485 10.54l-.547-.199C2.418 10.151 2 9.552 2 9c0-.556.42-1.153.938-1.341l9.124-3.318c.52-.19.938.105.938.654v8.01c0 .54-.42.842-.938.654l-3.03-1.102-5.547-2.017zM6 12.955V14c0 .552-.405 1.202-.895 1.447l-.21.106C4.4 15.8 4 15.549 4 15.009v-2.782l2 .728zm9.224-5.508l2-1a.5.5 0 0 0-.448-.894l-2 1a.5.5 0 0 0 .448.894zm-.448 4l2 1a.5.5 0 1 0 .448-.894l-2-1a.5.5 0 1 0-.448.894zM15 9.5h3a.5.5 0 1 0 0-1h-3a.5.5 0 1 0 0 1z" fill="currentColor" fillRule="evenodd" role="presentation"/></svg>);
    };
  }
}

export default FeedbackIcon;
