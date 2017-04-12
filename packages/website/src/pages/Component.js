import React from 'react';

/* eslint-disable react/prop-types */

import components from '../components';

const Component = ({ match }) => {
  const component = components[match.params.component];
  if (!component) {
    return <div>not found</div>;
  }
  const ActualComponent = component.package.default;
  return (
    <div>
      <h3>{component.name}</h3>
      <div>
        <ActualComponent />
      </div>
    </div>
  );
};

export default Component;
