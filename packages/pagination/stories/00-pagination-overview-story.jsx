import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';
import { name } from '../package.json';
import AkPagination, { Pagination } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import StatelessOverviewExample from './examples/stateless-overview';
import StatelessOverviewExampleRaw from '!raw!./examples/stateless-overview';
import StatefulOverviewExample from './examples/stateful-overview';
import StatefulOverviewExampleRaw from '!raw!./examples/stateful-overview';
import CustomLabelsExample from './examples/custom-labels';
import CustomLabelsExampleRaw from '!raw!./examples/custom-labels';
/* eslint-enable import/no-duplicates, import/first */

const description = '1-indexed pagination component.';

const commonPropDescriptions = {
  total: 'Total number of pages.',
  onSetPage: 'Callback, that is fired upon navigation to a different page.',
  i18n: 'Prev and Next items labels.',
};

const statelessPropDescriptions = {
  current: 'Currently active page.',
  ...commonPropDescriptions,
};

const statefulPropDescriptions = {
  defaultCurrent: 'Initial currently active page.',
  ...commonPropDescriptions,
};

const commonPropTypes = {
  total: 'integer',
  onSetPage: 'func',
  i18n: 'shape',
};

const statelessPropTypes = {
  current: 'integer',
  ...commonPropTypes,
};

const statefulPropTypes = {
  defaultCurrent: 'integer',
  ...commonPropTypes,
};

storiesOf(name, module)
  .add('Pagination (stateless): overview', () => (
    <Chrome title="Pagination (stateless): overview">
      <Description>
        <p>{description}</p>
      </Description>
      <StatelessOverviewExample />
      <Code>
        {StatelessOverviewExampleRaw}
      </Code>
      <Props
        component={Pagination}
        descriptions={statelessPropDescriptions}
        types={statelessPropTypes}
      />
    </Chrome>
  ))
  .add('Pagination (stateful): overview', () => (
    <Chrome title="Pagination (stateful): overview">
      <Description>
        <p>{description}</p>
      </Description>
      <StatefulOverviewExample />
      <Code>
        {StatefulOverviewExampleRaw}
      </Code>
      <Props
        component={AkPagination}
        descriptions={statefulPropDescriptions}
        types={statefulPropTypes}
      />
    </Chrome>
  ))
  .add('Pagination: custom labels', () => (
    <Chrome title="Pagination: custom labels">
      <CustomLabelsExample />
      <Code>
        {CustomLabelsExampleRaw}
      </Code>
    </Chrome>
  ));
