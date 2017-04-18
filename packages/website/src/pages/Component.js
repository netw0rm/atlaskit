import React from 'react';
import Button from '@atlaskit/button';

/* eslint-disable react/prop-types */

import components from '../components';

const Component = ({ match }) => {
  const component = components[match.params.component];
  if (!component) {
    return <div>not found</div>;
  }
  const ComponentDocs = component.docs;
  const storybookUrl = `https://aui-cdn.atlassian.com/atlaskit/stories/${component.package.name}/${component.package.version}/`;
  // const storybookUrl = `https://aui-cdn.atlassian.com/atlaskit/stories/@atlaskit/button/1.0.16/`;
  return (
    <div>
      <h3>{component.name}</h3>
      <div>
        <Button href={storybookUrl} target="_blank">See Storybook</Button>
      </div>
      <div>
        {ComponentDocs ? <ComponentDocs /> : <div>No Docs Yet</div>}
      </div>
    </div>
  );
};

export default Component;
