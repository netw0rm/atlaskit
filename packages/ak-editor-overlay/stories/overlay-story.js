import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Overlay from '../src/index';
import OverlayWithOntoggleOverlay from '../src/overlay-with-ontoggle-overlay-test';
const { React, ReactDOM } = window;
import { vdom } from 'skatejs';
import { name } from '../package.json';

const Component = reactify(Overlay, { React, ReactDOM });
const OverlayWithOntoggleOverlayComponent =
  reactify(OverlayWithOntoggleOverlay, { React, ReactDOM });

storiesOf(name, module)
  .add('a simple ak-editor-overlay', () => (
    <Component />
  ))
  .add('an ak-editor-overlay emits an event', () => (
    <OverlayWithOntoggleOverlayComponent />
  ));
