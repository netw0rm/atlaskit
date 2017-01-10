import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

import BannerExample from './examples/BannerExample'; // eslint-disable-line import/first, import/no-duplicates
import BannerExampleRaw from '!raw!./examples/BannerExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import { Banner } from '../src';

const flagGroupPropDescriptions = {
};

const flagGroupPropTypes = {
};

storiesOf(name, module)
  .add('Banner readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={BannerExampleRaw}>
          {BannerExample}
        </Code>
        <Props
          component={Banner}
          descriptions={flagGroupPropDescriptions}
          types={flagGroupPropTypes}
        />
      </Readme>
    </div>
  ));
