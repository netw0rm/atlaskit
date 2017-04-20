/* eslint-disable react/prop-types */

import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Dropdown from '@atlaskit/dropdown-menu';
import { Grid, GridColumn } from '@atlaskit/page';
import { akColorN80, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import data from '../data';
import NoMatch from '../pages/NoMatch';
import Docs from '../components/ComponentDocs';
import { Heading, Intro } from '../components/Type';

const MetaItem = ({ href, label, summary }) => (
  <DI>
    <DT>{label}</DT>
    <DD>{href
      ? <a href={href} target="_new">{summary}</a>
      : summary
    }</DD>
  </DI>
);

const TEMP_STATIC_VERSIONS = ['1.0.16', '1.0.13', '1.0.12', '1.0.11', '1.0.10', '1.0.9', '1.0.8', '1.0.7', '1.0.6', '1.0.5', '1.0.4', '1.0.3', '1.0.2', '1.0.0'];
const Header = ({ name, pkg, storybookUrl }) => (
  <Title>
    <TitleBar>
      <Heading style={{ marginTop: 0 }}>{name}</Heading>
      <ButtonGroup>
        <Button href={`${storybookUrl}/${pkg.version}/`} target="_new">
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
    <Intro>
      {pkg.description}
    </Intro>
  </Title>
);

const MetaData = ({ pkg, status }) => {
  const tag = pkg.name.replace('@atlaskit/', '');

  return (
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
        label="Version"
        summary={(
          <span>
            <a href={`https://npmjs.com/package/${pkg.name}`}>{pkg.version}</a>
            <time dateTime={status.date}> {status.date.toLocaleDateString()}</time>
          </span>
        )}
      />
      <MetaItem
        href={`https://unpkg.com/${tag}/dist`}
        label="Bundle"
        summary="unpkg.com"
      />
      <MetaItem
        label={`Maintainer${pkg.maintainers.length > 1 ? 's' : ''}`}
        summary={pkg.maintainers.map(m => m.name).join(', ')}
      />
    </Meta>
  );
};

export default ({ match }) => {
  const component = data[match.params.component];

  if (!component) return <Route component={NoMatch} />;

  const storybookUrl = `https://aui-cdn.atlassian.com/atlaskit/stories/${component.package.name}`;

  return (
    <Grid spacing="comfortable">
      <GridColumn medium={1} />
      <GridColumn medium={10}>
        <Helmet title={component.name}>
          <meta name="description" content={component.package.description} />
        </Helmet>
        <Header
          name={component.name}
          pkg={component.package}
          storybookUrl={storybookUrl}
        />
        <MetaData
          status={component.status}
          pkg={component.package}
        />
        <Main>
          <Docs component={component} />
        </Main>
      </GridColumn>
      <GridColumn medium={1} />
    </Grid>
  );
};

// <dt>Version</dt>
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
  padding-top: ${akGridSizeUnitless * 6}px;
`;
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Main = styled.main`
  padding-bottom: 24px;
`;

const Meta = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5em;
  margin-right: -0.5em;
  padding-bottom: ${akGridSizeUnitless * 1.5}px;
  padding-top: ${akGridSizeUnitless * 1.5}px;

  @media (min-width: 600px) {
    padding-bottom: ${akGridSizeUnitless * 3}px;
    padding-top: ${akGridSizeUnitless * 3}px;
  }
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
