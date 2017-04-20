import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Grid, GridColumn } from '@atlaskit/page';
import { Heading, Intro, Section } from '../components/Type';

export default class WelcomePage extends PureComponent {
  static propTypes = {
    location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }
  render() {
    const { location } = this.props;
    const title = 'Page Not Found (404)';

    return (
      <Grid spacing="comfortable">
        <GridColumn medium={12}>
          <Helmet title={title} />
          <Heading>{title}</Heading>
          <Intro>
            Sorry, we couldn&apos;t find a page at &quot;{location.pathname}&quot;. It may
            have moved or been deleted.
          </Intro>
          <Section>
            <h3>What now?</h3>
            <p>
              You can checkout our <Link to="/components">components page</Link>, or just head <Link to="/">home</Link>.
            </p>
          </Section>
        </GridColumn>
      </Grid>
    );
  }
}
