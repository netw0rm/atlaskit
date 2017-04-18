import React, { PureComponent } from 'react';
import { akGridSize, akColorN80 } from '@atlaskit/util-shared-styles';
import { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import landingHero from '../images/landing_hero.svg';

const gridInt = parseInt(akGridSize, 10);

const LandingHeading = styled.h2`
  font-size: ${gridInt * 4}px;
  font-weight: 500;
`;

const LandingIntro = styled.p`
  font-size: ${gridInt * 2}px;
  color: ${akColorN80};
  line-height: 1.8em;
`;

const LandingSection = styled.section`
  margin-top: 3em;

  p {
    line-height: 1.8em;
  }
`;

export default class WelcomePage extends PureComponent {
  render() {
    return (
      <div style={{ marginTop: gridInt * 6 }}>
        <Grid>
          <GridColumn small={12} medium={6}>
            <LandingHeading>AtlasKit</LandingHeading>
            <LandingIntro>
              AtlasKit gives you the building blocks to create your application experience in
              the Atlassian ADG3 style.
            </LandingIntro>
            <LandingSection>
              <h3>New to AtlasKit?</h3>
              <p>
                Check out the <a href="https://bitbucket.org/atlassian/atlaskit-starter/">atlaskit-starter</a> repo to get up and running with a React app and some demo AtlasKit components. There&apos;s also a non-React <a href="http://aui-cdn.atlassian.com/atlaskit/registry/reduced-ui-pack/latest/index.html">reduced UI pack</a> available.
              </p>
            </LandingSection>
            <LandingSection>
              <h3>Getting involved</h3>
              <p>
                Feel free to ask a question in the &quot;AtlasKit&quot; HipChat room, create a
                ticket on the <a href="https://ecosystem.atlassian.net/browse/AK">JIRA project</a>, or
                contribute with a PR on the <a href="https://bitbucket.org/atlassian/atlaskit">Bitbucket repo</a>.
              </p>
            </LandingSection>
          </GridColumn>
          <GridColumn small={12} medium={6}>
            <p>
              <img src={landingHero} alt="Landing page hero" style={{ marginTop: 48 }} />
            </p>
          </GridColumn>
        </Grid>
      </div>
    );
  }
}
