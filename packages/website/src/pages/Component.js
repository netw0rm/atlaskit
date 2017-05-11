/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Dropdown from '@atlaskit/dropdown-menu';
import { akColorN80, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import LayoutFork from 'react-media';
import { MOBILE_QUERY } from '../../constants';

import { getStorybookURL } from '../utils';
import data from '../data';
import NoMatch from '../pages/NoMatch';
import Container from '../components/Container';
import Docs from '../components/ComponentDocs';
import { Heading, Intro } from '../components/Type';

const componentKeys = Object.keys(data);
const componentItems = componentKeys.map((key) => {
  const pkg = data[key];

  return { content: pkg.name, value: key };
});

const MetaItem = ({ href, label, summary }) => (
  <DI>
    <DT>{label}</DT>
    <DD>{href
      ? <a href={href} target="_new">{summary}</a>
      : summary
    }</DD>
  </DI>
);

const Header = ({
  component,
  isSelectOpen,
  onClickDropdownItem,
}) => (
  <Title>
    <TitleBar>
      <Heading style={{ marginTop: 0 }}>{component.name}</Heading>
      <LayoutFork query={MOBILE_QUERY}>
        {matches => (matches ? (
          <Dropdown
            isOpen={isSelectOpen}
            items={[{ items: componentItems }]}
            onItemActivated={onClickDropdownItem}
            position="bottom right"
            triggerType="button"
          />
        ) : (
          <ButtonGroup>
            <Button href={getStorybookURL(component)} target="_blank">
              Storybook
            </Button>
            <Dropdown
              items={[{
                heading: 'Versions',
                items: component.versions.reverse().map(v => ({
                  content: v,
                  href: getStorybookURL(component, v),
                })),
                target: '_blank',
              }]}
              position="bottom right"
              triggerType="button"
            />
          </ButtonGroup>
        ))}
      </LayoutFork>
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

export default class PackageComponent extends PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = { isSelectOpen: false }

  componentWillMount() {
    this.setSelectedItem(this.props.match.params.component);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.component === this.props.match.params.component) return;

    this.setSelectedItem(nextProps.match.params.component);
  }
  setSelectedItem = (key) => {
    const component = data[key];

    if (!component) return;

    const selectedItem = { content: component.name, value: component.key };

    this.setState({ selectedItem });
  }

  render() {
    const component = data[this.props.match.params.component];

    if (!component) return <Route component={NoMatch} />;

    const { isSelectOpen } = this.state;
    const { router } = this.context;

    return (
      <Container>
        <Helmet title={component.name}>
          <meta name="description" content={component.description} />
        </Helmet>
        <Header
          component={component}
          isSelectOpen={isSelectOpen}
          onClickDropdownItem={(attrs) => {
            this.setState({ isSelectOpen: false, selectedItem: attrs.item }, () => {
              router.history.push(`/components/${attrs.item.value}`);
            });
          }}
        />
        <MetaData component={component} />
        <Main>
          <Docs component={component} />
        </Main>
      </Container>
    );
  }
}

const Title = styled.header`
  padding-top: ${akGridSizeUnitless * 3}px;

  @media (min-width: 780px) {
    padding-top: ${akGridSizeUnitless * 6}px;
  }
`;
const TitleBar = styled.div`
  align-items: center;
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

  @media (min-width: 780px) {
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

  @media (min-width: 780px) {
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
