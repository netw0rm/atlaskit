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
          <meta name="description" content="Atlassian's UI Library powered by React.js" />
        </Helmet>
        <Grid spacing="comfortable">
          <GridColumn small={12} medium={6}>
            <Heading>AtlasKit</Heading>
            <Intro>
              AtlasKit gives you the building blocks to create your application experience in
              the Atlassian ADG3 style.
            </Intro>
            <Section>
              <h3>New to AtlasKit?</h3>
              <p>
                Check out the <a href="https://bitbucket.org/atlassian/atlaskit-starter/">atlaskit-starter</a> repo to get up and running with a React app and some demo AtlasKit components. There&apos;s also a non-React <a href="http://aui-cdn.atlassian.com/atlaskit/registry/reduced-ui-pack/latest/index.html">reduced UI pack</a> available.
              </p>
            </Section>
            <Section>
              <h3>Getting involved</h3>
              <p>
                Feel free to ask a question in the &quot;AtlasKit&quot; HipChat room, create a
                ticket on the <a href="https://ecosystem.atlassian.net/browse/AK">JIRA project</a>, or
                contribute with a PR on the <a href="https://bitbucket.org/atlassian/atlaskit">Bitbucket repo</a>.
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
