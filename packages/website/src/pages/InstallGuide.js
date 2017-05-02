import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Grid, GridColumn } from '@atlaskit/page';

import { Heading, Intro, Section } from '../components/Type';
import landingHero from '../images/landing_hero.svg';

export default class Examples extends PureComponent {
  render() {
    const title = 'Install Guide';
    const description = 'How to get it...';

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
              <h3>1. The React components</h3>
              <p>
                These components are Atlassian Design Guidelines(ADG)
                compliant, reusable, well-maintained and accessible.
              </p>
              <ul>
                <li>The <a href="http://go.atlassian.com/ak-starter/" target="_blank" rel="noopener noreferrer">atlaskit-starter</a> project will help you get a React app setup and running with some demo AtlasKit components. </li>
                <li>Use this <a href="http://go.atlassian.com/ak-codepen/" target="_blank" rel="noopener noreferrer">codepen</a> sample as a sandbox to quickly try out our components. </li>
                <li>The <a href="./components">components</a> section of this site has docs, code samples and links to React storybooks.</li>
              </ul>

              <h3>2. The reduced UI pack</h3>
              <p>The reduced UI pack is a small set of
              ADG styles for use in any web project.</p>
              <ul>
                <li>Use this <a href="http://go.atlassian.com/reduced-ui-pack-codepen/" target="_blank" rel="noopener noreferrer">codepen</a> sample as a sandbox to quickly try out our styles. </li>
                <li>The <a href="http://go.atlassian.com/reduced-ui-pack" target="_blank" rel="noopener noreferrer">reduced UI pack</a> storybook is the comprehensive list of the styles available.</li>
              </ul>
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
