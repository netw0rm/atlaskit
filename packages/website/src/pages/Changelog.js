// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import BackIcon from '@atlaskit/icon/glyph/arrow-left';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';

import Changelog, { NoMatch } from '../components/Changelog';
import Cntnr from '../components/Container';
import data from '../data';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  match: {
    isExact: boolean,
    params: { component?: string, semver?: string },
    path: string,
    url: string,
  },
  history: any,
};
type State = { isInvalid: boolean, range: string };
/* eslint-enable react/no-unused-prop-types */

export default class ChangelogExplorer extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  state: State = { isInvalid: false, range: '' };

  componentWillMount() {
    const { semver } = this.props.match.params;
    if (semver) this.setState({ range: decodeURI(this.props.match.params.semver) });
  }

  handleChange = (e) => {
    const { component } = this.props.match.params;
    const range = e.target.value;
    let isInvalid = false;
    if (!isInvalid) this.props.history.replace(`/changelog/${component}/${encodeURI(range)}`);

    if (/[a-z]/gi.test(range)) isInvalid = true;

    this.setState({ isInvalid, range });
  }

  render() {
    const { match } = this.props;
    const pkg = data[match.params.component];
    const { isInvalid, range } = this.state;

    return (
      <Container>
        <Back to={`/components/${pkg.key}`} />
        <h1>Changelog: {pkg.name}</h1>
        <TextField
          autoFocus
          isInvalid={isInvalid}
          label="Semver Range"
          onChange={this.handleChange}
          placeholder={'e.g. "> 1.0.6 <= 3.0.2"'}
          shouldFitContainer
          value={range}
        />
        {isInvalid ? (
          <NoMatch>
            Invalid range; please try again.
          </NoMatch>
        ) : (
          <LogWrapper>
            <Changelog
              changelog={pkg.changelog}
              range={range}
              packageName={pkg.key}
            />
          </LogWrapper>
        )}
      </Container>
    );
  }
}

const Back = (
  { children, to }:
  { children: Element | Node | string, to: string }
) => (
  <Button
    appearance="link"
    component={Link}
    iconBefore={<BackIcon label="Back Icon" size="small" />}
    spacing="none"
    to={to}
  >
    <span style={{ paddingLeft: '0.5em' }}>
      {children || 'Back to Docs'}
    </span>
  </Button>
);

const Container = styled(Cntnr)`
  padding-bottom: 40px;
  padding-top: 40px;
`;
const LogWrapper = styled.div`
  margin-top: 2em;

  p {
    display: none
  }
`;
