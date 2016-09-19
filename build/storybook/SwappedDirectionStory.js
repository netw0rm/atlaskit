import React from 'react';

const SwappedDirectionStory = (props) => {
  const swapped = window.getComputedStyle(document.body).direction.split('').reverse().join('');
  return (
    <div dir={swapped}>
      {props.children}
    </div>
  );
};
SwappedDirectionStory.displayName = 'SwappedDirectionStory';
SwappedDirectionStory.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default SwappedDirectionStory;
