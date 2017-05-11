import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Grid, GridColumn } from '@atlaskit/page';

import landingHero from 'svg-url-loader!../images/landing_hero.svg';
import { Heading, Intro, Section } from '../components/Type';

export default class WelcomePage extends PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <meta name="description" content="A set of React components that implements Atlassian Design Guidelines" />
        </Helmet>
        <Grid spacing="comfortable">
          <GridColumn small={12} medium={6}>
            <Heading>AtlasKit</Heading>
            <Intro>
              AtlasKit is Atlassian&#39;s official UI library, built according to
              the <a href="//www.atlassian.design" target="_blank" rel="noopener noreferrer">Atlassian Design Guidelines</a>(ADG).
            </Intro>
            <Section>
              <h3>Getting started</h3>
              <p>To learn how to get ADG into your projects, check out the <a href="./install">install guide</a>.</p>
            </Section>
            <Section>
              <h3>Getting involved</h3>
              <p>
                We welcome issue and code contributions. Please start by reading our <a href="//bitbucket.org/atlassian/atlaskit/src/HEAD/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contribution guide</a>.
              </p>
              <p>
                &nbsp;
              </p>
            </Section>
            <Section>
              <p><em>
                Atlassians: For internal, Fabric and Media Services components,
                {' '}<a href="//aui-cdn.atlassian.com/atlaskit/registry/components.html" target="_blank" rel="noopener noreferrer">click&nbsp;here</a>.
              </em></p>
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
