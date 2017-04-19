/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Lozenge from '@atlaskit/lozenge';
import Dropdown from '@atlaskit/dropdown-menu';
import { akColorN80, akColorN200 } from '@atlaskit/util-shared-styles';

import data from '../data';
import Docs from '../components/ComponentDocs';

const MetaItem = ({ href, label, summary }) => (
  <DI>
    <DT>{label}</DT>
    <DD>{href
      ? <a href={href} target="_new">{summary}</a>
      : summary
    }</DD>
  </DI>
);

const Header = ({ meta, name, pkg, storybookUrl }) => {
  const tag = pkg.name.replace('@atlaskit/', '');
  const TEMP_STATIC_VERSIONS = ['1.0.16', '1.0.13', '1.0.12', '1.0.11', '1.0.10', '1.0.9', '1.0.8', '1.0.7', '1.0.6', '1.0.5', '1.0.4', '1.0.3', '1.0.2', '1.0.0'];

  return (
    <Title>
      <TitleBar>
        <h1>{name}</h1>
        <ButtonGroup>
          <Button href={`${storybookUrl}/${meta.version}/`} target="_new">
            Storybook
          </Button>
          <Dropdown
            items={[{
              heading: 'Versions',
              items: TEMP_STATIC_VERSIONS.map(v => ({
                content: v,
                href: `${storybookUrl}/${v}/`,
              })),
              target: '_blank',
            }]}
            position="bottom right"
            triggerType="button"
          />
        </ButtonGroup>
      </TitleBar>
      <Lead>{pkg.description}</Lead>
      <Meta>
        <MetaItem
          label="Install"
          summary={<code>yarn add {pkg.name}</code>}
        />
        <MetaItem
          href={`https://www.npmjs.com/package/${pkg.name}`}
          label="Docs"
          summary="Documentation on NPM"
        />
        <MetaItem
          href={`https://bitbucket.org/atlassian/atlaskit/src/master/packages/${tag}`}
          label="Source"
          summary="Bitbucket"
        />
        <MetaItem
          href={`https://npmjs.com/package/${pkg.name}`}
          label="Version"
          summary={meta.version}
        />
        <MetaItem
          href={`https://unpkg.com/${tag}/dist`}
          label="Bundle"
          summary="unpkg.com"
        />
        <MetaItem
          label="Team"
          summary={<Lozenge appearance="new">AtlasKit</Lozenge>}
        />
      </Meta>
    </Title>
  );
};

export default ({ match }) => {
  const component = data[match.params.component];

  if (!component) return <h1>(not found)</h1>;

  const storybookUrl = `https://aui-cdn.atlassian.com/atlaskit/stories/${component.package.name}`;
  const storybookSuffix = 'index.html';

  return (
    <article>
      <Header
        meta={component.meta}
        name={component.name}
        pkg={component.package}
        storybookUrl={storybookUrl}
        storybookSuffix={storybookSuffix}
      />
      <Main>
        <Docs component={component} />
      </Main>
    </article>
  );
};

// <dt>This version</dt>
// <dd>
//   <a href={`https://npmjs.com/package/${pkg.name}`}>{data.version}</a>
//   {data.npmInfo.isPublished ? (
//     <span style={{ paddingLeft: 4 }}>
//       (<RelativeDate iso={data.npmInfo.publishTime} />)
//       <Lozenge appearance="success">Published</Lozenge>
//     </span>
//   ) : null}
// </dd>

const Title = styled.header`
  padding-bottom: 24px;
  padding-top: 24px;
`;
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Main = styled.main`
  padding-bottom: 24px;
`;
const Lead = styled.p`
  color: ${akColorN200};
  font-size: 1.4em;
  font-weight: 300;
  margin-bottom: 24px;
  margin-top: 12px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5em;
  margin-right: -0.5em;
`;
const DI = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 0.5em;

  @media (min-width: 600px) {
    flex-direction: row;
  }
  @media (min-width: 1200px) {
    flex-basis: 50%;
  }
`;
const DT = styled.div`
  color: ${akColorN80};
  flex-basis: 25%;
`;
const DD = styled.div`
  flex: 1 0 auto;
`;
