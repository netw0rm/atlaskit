import React from 'react';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';

/* eslint-disable react/prop-types */

import data from '../data';
import ComponentDocs from '../components/ComponentDocs';

const Component = ({ match }) => {
  const component = data[match.params.component];

  if (!component) return <div>not found</div>;

  const storybookUrl = `https://aui-cdn.atlassian.com/atlaskit/stories/${component.package.name}/${component.package.version}/`;

  return (
    <div>
      <Header
        name={component.name}
        pkg={component.package}
        storybookUrl={storybookUrl}
      />
      <div>
        <ComponentDocs component={component} />
      </div>
    </div>
  );
};

const Header = ({ name, pkg, storybookUrl }) => {
  const tag = pkg.name.replace('@atlaskit/', '');

  return (
    <div>
      <h1>{name}</h1>
      <Button href={storybookUrl} target="_blank">See Storybook</Button>
      <p>{pkg.description}</p>
      <div className="row">
        <div className="col-5">
          <dl>
            <dt>Install</dt>
            <dd>
              <code>yarn add {pkg.name}</code>
            </dd>
            <dt>Documentation</dt>
            <dd>
              <a href={`https://www.npmjs.com/package/${pkg.name}`}>Docs on NPM</a>
            </dd>
            <dt>Source code</dt>
            <dd>
              <a href={`https://bitbucket.org/atlassian/atlaskit/src/master/packages/${tag}`}>Bitbucket</a>
            </dd>
          </dl>
        </div>

        <div className="col-5">
          <dl>
            <dt>This version</dt>
            <dd>
              {/* <a href={`https://npmjs.com/package/@atlaskit/${pkg.name}`}>{data.version}</a>
              {data.npmInfo.isPublished ? (
                <span style={{ paddingLeft: 4 }}>
                  (<RelativeDate iso={data.npmInfo.publishTime} />)
                  <Lozenge appearance="success">Published</Lozenge>
                </span>
              ) : null} */}
            </dd>
            <dt>Bundle</dt>
            <dd>
              <a href={`https://unpkg.com/${tag}/dist/`}>unpkg dist</a>
            </dd>
            <dt>Team</dt>
            <dd><Lozenge appearance="new">AtlasKit</Lozenge></dd>
          </dl>

        </div>
      </div>
    </div>
  );
};

export default Component;
