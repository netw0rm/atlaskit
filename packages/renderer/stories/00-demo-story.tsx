import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import RendererDemo from './renderer-demo';
import { name } from '../package.json';

storiesOf(name, module)
  .add('renderer with providers and portal (profile cards)', () => {
    return <RendererDemo withProviders={true} withPortal={true} serializer="react"/>;
  })
  .add('renderer with providers', () => {
    return <RendererDemo withProviders={true} serializer="react"/>;
  })
  .add('renderer without providers', () => {
    return <RendererDemo serializer="react"/>;
  })
  .add('text renderer', () => {
    return <RendererDemo serializer="text"/>;
  })
;
