import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import AnimatedBox from './animation/AnimatedBox';
import AnimatedBoxGroup from './animation/AnimatedBoxGroup';
import { Container } from './animation/styled';

storiesOf(name, module)
  .add('Bold, Optimistic and Combined curves', () => (
    <div>
      <p>This page shows the <strong>Bold</strong>, <strong>Optimistic</strong> and
        <strong>Combined</strong> animation curves.
      </p>
      <p>In this example we are simply animating the translateY property but the same idea would
        apply to animating anthing else.
      </p>
      <AnimatedBoxGroup />
    </div>
  ))
  .add('Bold animation curve', () => (
    <div>
      <p>Bold animations should be used to focus attentions on a certain element on a page and only
        one such animation should ever be present at a time.
      </p>
      <p>It follows an 80/20 rule where it will do 80% of it&#39;s motion in the first 20% of
        the time
      </p>
      <Container>
        <AnimatedBox appearance="bold">
          Bold
        </AnimatedBox>
      </Container>
    </div>
  ))
  .add('Optimistic animation curve', () => (
    <div>
      <p>Optimistic animations should be used to make a page still feel like it is moving whilst
        things are moving.
      </p>
      <p>The curve itself will cause a property to “overshoot” by 5%, “undershoot” by 2.5% and
        finally, settle on the end value.
      </p>
      <Container>
        <AnimatedBox appearance="optimistic">
          Optimistic
        </AnimatedBox>
      </Container>
    </div>
  ))
  .add('Combined animation curve', () => (
    <div>
      <p>The combined animation curve brings in the best of both worlds</p>
      <Container>
        <AnimatedBox appearance="combined">
          Combined
        </AnimatedBox>
      </Container>
    </div>
  ));
