/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import LayoutFork from 'react-media';

import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Dropdown from '@atlaskit/dropdown-menu';

import { borderRadius, colors, gridSize, math, themed } from '../../../../theme/src';

import { MOBILE_QUERY, NO_FOOTER_COMPONENT } from '../../../constants';

import { getStorybookURL } from '../../utils';
import data from '../../data';
import NoMatch from '../../pages/NoMatch';
import Container from '../../components/Container';
import Docs from '../../components/ComponentDocs';
import { Heading, Intro } from '../../components/Type';

import MetaData from './MetaData';
import LatestChange from './LatestChange';

const componentKeys = Object.keys(data);
const componentItems = componentKeys.map((key) => {
  const pkg = data[key];

  return { content: pkg.name, value: key };
});

const Header = ({
  component,
  isSelectOpen,
  onClickDropdownItem,
}) => (
  <Title>
    <TitleBar>
      <Heading style={{ marginTop: 0 }} itemProp="name">{component.name}</Heading>
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
    <Intro itemProp="description">
      {component.description}
    </Intro>
  </Title>
);

const Footer = ({
  nextTitle,
  nextUrl,
  prevTitle,
  prevUrl,
}) => (
  <FooterRoot>
    {prevUrl ? (
      <FooterItem to={prevUrl}>
        <FooterLabel>Previous</FooterLabel>
        <FooterTitle>{prevTitle}</FooterTitle>
      </FooterItem>
    ) : <FooterItemPlaceholder />}
    {nextUrl ? (
      <FooterItem to={nextUrl}>
        <FooterLabel>Next up</FooterLabel>
        <FooterTitle>{nextTitle}</FooterTitle>
      </FooterItem>
    ) : <FooterItemPlaceholder />}
  </FooterRoot>
);

export default class PackageComponent extends PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = { isSelectOpen: false }

  componentWillMount() {
    this.setSelectedItem(this.props.name);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.name === this.props.name) return;

    this.setSelectedItem(nextProps.name);
  }
  setSelectedItem = (key) => {
    const component = data[key];

    if (!component) return;

    const selectedItem = { content: component.name, value: component.key };

    this.setState({ selectedItem });
  }

  render() {
    const { component } = this.props;
    if (!component) return <Route component={NoMatch} />;

    const { isSelectOpen } = this.state;
    const { router } = this.context;

    const componentIndex = componentKeys.indexOf(component.key);
    const prevComponent = data[componentKeys[componentIndex - 1]];
    const nextComponent = data[componentKeys[componentIndex + 1]];

    return (
      <Container>
        <Helmet title={component.name}>
          <meta name="description" content={component.description} />
        </Helmet>
        <article itemScope itemType="http://schema.org/Thing">
          <Header
            component={component}
            isSelectOpen={isSelectOpen}
            onClickDropdownItem={(attrs) => {
              this.setState({ isSelectOpen: false, selectedItem: attrs.item }, () => {
                router.history.push(`/components/${attrs.item.value}`);
              });
            }}
          />
          <MetaData
            packageKey={component.key}
            packageName={component.packageName}
          />
          <LatestChange changelog={component.changelog} componentKey={component.key} />
          <Main itemProp="mainEntity">
            <Docs component={component} />
          </Main>
          {!NO_FOOTER_COMPONENT.includes(component.key) ? <Footer
            nextTitle={nextComponent ? nextComponent.name : null}
            nextUrl={nextComponent ? `/components/${nextComponent.key}` : null}
            prevTitle={prevComponent ? prevComponent.name : null}
            prevUrl={prevComponent ? `/components/${prevComponent.key}` : null}
          /> : null}
        </article>
      </Container>
    );
  }
}

export const NavPackageComponent = ({ match }) => {
  const name = match.params.component;
  const componentData = data.navigation.components[name];
  let component;
  if (componentData) {
    component = {
      ...data.navigation,
      name,
      docs: componentData,
      description: componentData.byline,
      components: undefined,
      props: data.navigation.props.filter(comp => comp.name === name),
    };
  }
  return (<PackageComponent component={component} name={name} />);
};

export const StandardComponent = ({ match }) => (
  <PackageComponent component={data[match.params.component]} name={match.params.component} />
);

// Header
const Title = styled.header`
  padding-top: ${math.multiply(gridSize, 3)}px;

  @media (min-width: 780px) {
    padding-top: ${math.multiply(gridSize, 6)}px;
  }
`;
const TitleBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Main = styled.main`
  padding-bottom: ${math.multiply(gridSize, 3)}px;
`;

// Footer
const FooterRoot = styled.footer`
  border-radius: ${borderRadius}px;
  display: flex;
  margin-bottom: ${math.multiply(gridSize, 3)}px;
`;
const FooterItem = styled(Link)`
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  flex: 1;
  padding: ${math.multiply(gridSize, 2)}px;
  text-decoration: none;

  &:first-child {
    border-top-left-radius: ${borderRadius}px;
    border-bottom-left-radius: ${borderRadius}px;
  }
  &:last-child {
    border-top-right-radius: ${borderRadius}px;
    border-bottom-right-radius: ${borderRadius}px;
  }

  &:hover {
    background-color: ${themed({ light: colors.N30, dark: colors.DN60 })};
    position: relative;
    text-decoration: none;

    > span {
      text-decoration: underline;
    }
  }
  &:focus {
    position: relative;
  }
`;
const FooterItemPlaceholder = styled.span`
  flex: 1;
`;
const FooterLabel = styled.h5`
  color: ${colors.heading};
  margin-bottom: 1em;
`;
const FooterTitle = styled.span`
  color: ${colors.primary};
`;
