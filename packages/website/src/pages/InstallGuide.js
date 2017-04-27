import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Grid, GridColumn } from '@atlaskit/page';

import { Heading, Intro, Section } from '../components/Type';
import landingHero from '../images/landing_hero.svg';

export default class Examples extends PureComponent {
  render() {
    const title = 'Install Guide';
    const description = 'A guide on how to install AtlasKit from Atlassian.';

    return (
      <div>
        <Helmet title={title}>
          <meta name="description" content={description} />
        </Helmet>
        <Grid spacing="comfortable">
          <GridColumn small={12} medium={6}>
            <Heading>{title}</Heading>
            <Intro>{description}</Intro>
            <Section>
              <p>There are two ways to implement Atlassian Design
              Guidelines in your software projects.</p>
              <h3>1. React components</h3>
              <p>
                AtlasKit is a collection of React components built according to the
                Atlassian Design Guidelines(ADG).
              </p>
              <ul>
                <li>The <a href="//go.atlassian.com/ak-starter/" target="_blank" rel="noopener noreferrer">atlaskit-starter</a> repo will help you get setup and running with a React app and some demo AtlasKit components. </li>
                <li>The <a href="//go.atlassian.com/ak-codepen/" target="_blank" rel="noopener noreferrer">codepen</a> sample is a sandbox to quickly try out some components. </li>
                <li>The docs and code samples in this site will give you a comprehensive view on
                how to use our components.</li>
              </ul>

              <h3>2. Reduced UI pack</h3>
              <p>The Reduced UI pack is a set of CSS styles used
              to make basic HTML elements ADG.</p>
              <ul>
                <li>The <a href="//go.atlassian.com/reduced-ui-pack-codepen/" target="_blank" rel="noopener noreferrer">codepen</a> sample is a sandbox to quickly try out some components. </li>
                <li>The <a href="//go.atlassian.com/reduced-ui-pack" target="_blank" rel="noopener noreferrer">reduced UI pack</a> has a comprehensive list of the styles available.</li>
              </ul>
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
