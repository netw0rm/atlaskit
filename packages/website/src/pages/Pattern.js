/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import patterns from '../../patterns';
import NavExample from './Navigation/Example';
import BaseExample from '../components/ComponentExample';
import NoMatch from './NoMatch';
import Container from '../components/Container';
import { Heading, Section } from '../components/Type';

export default class Pattern extends PureComponent {
  render() {
    const currentPattern = patterns.filter(pattern => (
      pattern.title === this.props.match.params.example
    ))[0];
    if (!currentPattern) return <NoMatch />;

    if (currentPattern.type === 'navTakeover') return <NavExample example={currentPattern} />;
    return (
      <Container>
        <Heading>{currentPattern.title}</Heading>
        <Section>
          <BaseExample
            Component={currentPattern.Component}
            title={currentPattern.title}
            src={currentPattern.src}
          />
        </Section>
      </Container>
    );
  }
}
