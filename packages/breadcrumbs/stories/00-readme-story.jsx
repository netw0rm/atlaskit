import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import defaultComponent from '../src/Breadcrumbs';
import defaultComponentSource from '!raw!../src/Breadcrumbs';
import defaultOverview from './examples/breadcrumbs-usage';
import defaultOverviewSource from '!raw!./examples/breadcrumbs-usage';

import BreadcrumbsStateless from '../src/BreadcrumbsStateless';
import BreadcrumbsStatelessSource from '!raw!../src/BreadcrumbsStateless';

import BreadcrumbsItem from '../src/BreadcrumbsItem';
import BreadcrumbsItemSource from '!raw!../src/BreadcrumbsItem';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 Export: Default', () => (
    <Readme
      name={name}
      component={defaultComponent}
      componentSource={defaultComponentSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  )).add('📖 Export: AkBreadcrumbsStateless', () => (
    <Readme
      name={name}
      component={BreadcrumbsStateless}
      componentSource={BreadcrumbsStatelessSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  )).add('📖 Export: AkBreadcrumbsItem', () => (
    <Readme
      name={name}
      component={BreadcrumbsItem}
      componentSource={BreadcrumbsItemSource}
      example={defaultOverview}
      exampleSource={defaultOverviewSource}
      description={description}
    />
  ));
