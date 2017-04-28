import React, { PropTypes, PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Heading, Intro, Section } from '../components/Type';
import lostImage from '../images/404-image.png';
import styled from 'styled-components';

const Img = styled.img`
  height: auto;
  margin-top: 48;
  max-width: 448px;
  padding-top: 24px;
`;

const Center = styled.div`
  text-align: center;
`

export default class WelcomePage extends PureComponent {
  static propTypes = {
    location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }
  render() {
    const { location } = this.props;

    return (
      <Center>
          <Helmet title="Page not found (404)" />
          <Img
            alt="Adventurers"
            src={lostImage}
          />
          <Heading>Looks like we&#39;re off the beaten track</Heading>
          <Intro>
            Let the nav to your left guide you back
          </Intro>
      </Center>
    );
  }
}
