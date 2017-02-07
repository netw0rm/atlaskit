import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import BannerExample from './examples/BannerExample'; // eslint-disable-line import/first, import/no-duplicates
import BannerExampleRaw from '!raw!./examples/BannerExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import Banner from '../src';

const bannerPropDescriptions = {
  appearance: 'Visual style to be used for the banner',
  children: 'Content to be shown next to the icon. Typically text content but can contain links.',
  icon: 'Icon to be shown left of the main content. Typically an AtlasKit icon (ak-icon)',
  isOpen: 'Defines whether the banner is shown. An animation is used when the value is changed.',
};

const bannerPropTypes = {
  appearance: 'oneOf(["warning", "error"])',
  children: 'node',
  icon: 'node (ak-icon)',
  isOpen: 'bool',
};

storiesOf(name, module)
  .add('📖 Banner readme', () => (
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
          descriptions={bannerPropDescriptions}
          types={bannerPropTypes}
        />
      </Readme>
    </div>
  ));
