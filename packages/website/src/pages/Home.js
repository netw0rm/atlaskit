import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Grid, GridColumn } from '@atlaskit/page';

import { Heading, Intro, Section } from '../components/Type';
import landingHero from '../images/landing_hero.svg';

export default class WelcomePage extends PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <meta name="description" content="AtlasKit is the technical implementation of the Atlassian Design Guidelines" />
        </Helmet>
        <Grid spacing="comfortable">
          <GridColumn small={12} medium={6}>
            <Heading>AtlasKit</Heading>
            <Intro>
              AtlasKit gives you the building blocks to create your application experiences using
              the <a href="//www.atlassian.design" target="_blank" rel="noopener noreferrer">Atlassian Design Guidelines</a>(ADG).
            </Intro>
            <Section>
              <h3>Getting started</h3>
              <p>There two ways to start using our library of components. To get started, check out the <a href="./install">install guide</a>.</p>
            </Section>
            <Section>
              <h3>Getting involved</h3>
              <p>
                We welcome issue and code contributions. Please start with our <a href="//bitbucket.org/atlassian/atlaskit/src/HEAD/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contribution guide</a>.
              </p>
              <p>
                &nbsp;
              </p>
            </Section>
          </GridColumn>
          <GridColumn small={12} medium={6}>
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
      </div>
    );
  }
}
