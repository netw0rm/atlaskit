import React from 'react';

const RTLStory = (props) => (
  <div dir="rtl">
    {props.children}
  </div>
);
RTLStory.displayName = 'RTLStory';
RTLStory.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default RTLStory;
