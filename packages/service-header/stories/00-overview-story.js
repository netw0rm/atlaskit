import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import AkServiceHeader from '../src/index';

/* eslint-disable import/first, import/no-duplicates */
import OverviewExample from './examples/overview';
import OverviewExampleRaw from '!raw!./examples/overview';
/* eslint-enable import/first, import/no-duplicates */

const propTypes = {
  logoHref: 'string',
  title: 'string',
  titleHref: 'string',
};

const propDescriptions = {
  logoHref: "The href that the Atlassian logo should link to, usually the service site's homepage.",
  title: 'The page title.',
  titleHref: 'The href the page title should link to, which can be contextual to a section of the service site.',
};

storiesOf(name, module)
  .add('Overview', () => (
    <Readme component={name} description={description}>
      <Code code={OverviewExampleRaw}>
        {OverviewExample}
      </Code>
      <Props component={AkServiceHeader} descriptions={propDescriptions} types={propTypes} />
    </Readme>
  ));
