import React, { PropTypes } from 'react';

const StencilStory = props => (
  <div>
    <img
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: props.width,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      alt="stencil"
      src={props.image}
    />
    {props.children}
  </div>
);
StencilStory.displayName = 'StencilStory';
StencilStory.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.string,
  width: PropTypes.node.isRequired,
};

export default StencilStory;
