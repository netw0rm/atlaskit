/* eslint-disable react/prop-types */

import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Media from 'react-media';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Dropdown from '@atlaskit/dropdown-menu';
import { Grid, GridColumn } from '@atlaskit/page';
import { akColorN80, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import { LARGE_DESKTOP_QUERY } from '../../constants';

import { getStorybookURL } from '../utils';
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

const Header = ({ component }) => (
  <Title>
    <TitleBar>
      <Heading style={{ marginTop: 0 }}>{component.name}</Heading>
      <ButtonGroup>
        <Button href={getStorybookURL(component)} target="_blank">
          Storybook
        </Button>
        <Dropdown
          items={[{
            heading: 'Versions',
            items: component.versions.map(v => ({
              content: v,
              href: getStorybookURL(component, v),
            })),
            target: '_blank',
          }]}
          position="bottom right"
          triggerType="button"
        />
      </ButtonGroup>
    </TitleBar>
    <Intro>
      {component.description}
    </Intro>
  </Title>
);

const MetaData = ({ component }) => (
  <Meta>
    <MetaItem
      label="Install"
      summary={<code>yarn add {component.packageName}</code>}
    />
    <MetaItem
      href={`https://www.npmjs.com/package/${component.packageName}`}
      label="npm"
      summary={component.packageName}
    />
    <MetaItem
      href={`https://bitbucket.org/atlassian/atlaskit/src/master/packages/${component.key}`}
      label="Source"
      summary="Bitbucket"
    />
    <MetaItem
      label="Version"
      summary={(
        <span>
          <strong>{component.version}</strong>
          {component.publishedDate ? (
            <time dateTime={component.publishedDate} style={{ marginLeft: 10 }}>
              {new Date(component.publishedDate).toLocaleDateString()}
            </time>
          ) : null}
        </span>
      )}
    />
    <MetaItem
      href={`https://unpkg.com/${component.packageName}/dist`}
      label="Bundle"
      summary="unpkg.com"
    />
    <MetaItem
      label={`Maintainer${component.maintainers.length > 1 ? 's' : ''}`}
      summary={component.maintainers.map(m => m.name).join(', ')}
    />
  </Meta>
);

export default ({ match }) => {
  const component = data[match.params.component];

  if (!component) return <Route component={NoMatch} />;

  return (
    <Media query={LARGE_DESKTOP_QUERY}>{matches => (
      <Grid spacing="comfortable">
        {matches ? <GridColumn medium={1} /> : null}
        <GridColumn medium={matches ? 10 : 12}>
          <Helmet title={component.name}>
            <meta name="description" content={component.description} />
          </Helmet>
          <Header component={component} />
          <MetaData component={component} />
          <Main>
            <Docs component={component} />
          </Main>
        </GridColumn>
        {matches ? <GridColumn medium={1} /> : null}
      </Grid>
    )}</Media>
  );
};

// <dt>Version</dt>
// <dd>
//   <a href={`https://npmjs.com/package/${component.packageName}`}>{data.version}</a>
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
