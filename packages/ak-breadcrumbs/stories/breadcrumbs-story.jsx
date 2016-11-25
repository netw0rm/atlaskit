import { storiesOf } from '@kadira/storybook';
import React from 'react';

import AkBreadcrumbs, { AkBreadcrumbsItem } from '../src';
import { name } from '../package.json';


storiesOf(name, module)
  .add('simple ak-breadcrumbs', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/pages">Pages</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/home">Home</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/adg3">ADG 3 - New site</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/daccontent">design.atlassian.com content</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/product-design">Product design (draft)</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/patternsdesign">Patterns design (draft)</AkBreadcrumbsItem>
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with no items', () => (
    <AkBreadcrumbs />
  ))
  .add('ak-breadcrumbs with one item', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/page">Page</AkBreadcrumbsItem>
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with one item with very long text', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/supercalifragilisticexpialidocious">
        Supercalifragilisticexpialidocious
      </AkBreadcrumbsItem>
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with many items', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/item">Item 1</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 2</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 3</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 4</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 5</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 6</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 7</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 8</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item 9</AkBreadcrumbsItem>
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with many items, inside small container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <AkBreadcrumbs >
        <AkBreadcrumbsItem href="/pages">Pages</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/pages/home">Home</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/pages/adg3">ADG 3 - New site</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/pages/daccontent">design.atlassian.com content</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/pages/product-design">Product design (draft)</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/pages/patternsdesign">Patterns design (draft)</AkBreadcrumbsItem>
      </AkBreadcrumbs>
    </div>
  ));
