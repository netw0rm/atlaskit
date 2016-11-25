import { storiesOf } from '@kadira/storybook';
import React from 'react';

import AkBreadcrumbs, { AkBreadcrumbsItem } from '../src';
import { name } from '../package.json';


storiesOf(name, module)
  .add('a simple ak-breadcrumbs', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/pages">Pages</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/home">Home</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/adg3">ADG 3 - New site</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/daccontent">design.atlassian.com content</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/product-design">Product design (draft)</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/patternsdesign">Patterns design (draft)</AkBreadcrumbsItem>
    </AkBreadcrumbs>
  ));
