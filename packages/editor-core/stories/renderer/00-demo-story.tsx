import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import RendererDemo from './renderer-demo';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('renderer', () => {
    return <RendererDemo withProviders={true} serializer="react"/>;
  })
  .add('renderer without providers', () => {
    return <RendererDemo withProviders={false} serializer="react"/>;
  })
  .add('text renderer', () => {
    return <RendererDemo withProviders={false} serializer="text"/>;
  })
;
