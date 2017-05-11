/* eslint-disable react/prop-types, no-confusing-arrow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { Grid, GridColumn } from '@atlaskit/page';
import Button from '@atlaskit/button';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import { MOBILE_QUERY } from '../../constants';

import { Heading, Intro, Section } from '../components/Type';
import Container from '../components/Container';
import landingHero from '../images/landing_hero.svg';

const IntroContent = props => (
  <Intro {...props}>
    AtlasKit is Atlassian&#39;s official UI library, built according to
    the <a href="//www.atlassian.design" target="_blank" rel="noopener noreferrer">Atlassian Design Guidelines</a>(ADG).
  </Intro>
);

const GettingStartedContent = () => (
  <Section>
    <h3>Getting started</h3>
    <p>To learn how to get ADG into your projects, check out the <a href="./install">install guide</a>.</p>
  </Section>
);

const GettingInvolvedContent = () => (
  <Section>
    <h3>Getting involved</h3>
    <p>
      We welcome issue and code contributions. Please start by reading our <a href="//bitbucket.org/atlassian/atlaskit/src/HEAD/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contribution guide</a>.
    </p>
  </Section>
);

const Mobile = () => (
  <MobileIntro>
    <Heading style={{ marginLeft: akGridSizeUnitless * 2 }}>Welcome</Heading>
    <Row>
      <Col width="60%">
        <IntroContent style={{ marginBottom: 40 }} />
        <Button component={Link} to="/components" appearance="primary">
          View Components
        </Button>
      </Col>
      <Col width="40%">
        <MobileHero alt="Landing page hero" src={landingHero} />
      </Col>
    </Row>
    <Container>
      <GettingStartedContent />
      <GettingInvolvedContent />
    </Container>
  </MobileIntro>
);

const Desktop = () => (
  <Grid spacing="comfortable">
    <GridColumn medium={6}>
      <Heading>AtlasKit</Heading>
      <IntroContent />
      <GettingStartedContent />
      <GettingInvolvedContent />
      <Section style={{ marginTop: 60 }}>
        <p><em>
          Atlassians: For internal, Fabric and Media Services components,
          {' '}<a href="//aui-cdn.atlassian.com/atlaskit/registry/components.html" target="_blank" rel="noopener noreferrer">click&nbsp;here</a>.
        </em></p>
      </Section>
    </GridColumn>
    <GridColumn medium={6}>
      <p>
        <img
          alt="Landing page hero"
          src={landingHero}
          style={{
            height: 'auto',
            marginTop: 48,
            maxWidth: '100%',
          }}
        />
      </p>
    </GridColumn>
  </Grid>
);

export default class WelcomePage extends PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <meta name="description" content="A set of React components that implements Atlassian Design Guidelines" />
        </Helmet>
        <Media query={MOBILE_QUERY}>
          {matches => matches ? <Mobile /> : <Desktop />}
        </Media>
      </div>
    );
  }
}

const MobileIntro = styled.div`
`;
const Row = styled.div`
  display: flex;
  padding-left: ${akGridSizeUnitless * 2}px;
  padding-top: 40px;
  overflow: hidden;
`;
const Col = styled.div`
  width: ${props => props.width ? props.width : '50%'};
`;
const MobileHero = styled.img`
  height: auto;
  margin-left: -${akGridSizeUnitless * 2}px;
  margin-right: -40px;
  margin-top: -40px;
  width: 290px; /* arbitrary */
`;
