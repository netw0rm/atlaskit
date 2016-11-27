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
    <AkBreadcrumbs >
      <AkBreadcrumbsItem href="/item">Item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Another item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">A third item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">A fourth item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Yet another item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">An item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The next item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The item after the next item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The ninth item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item ten</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The last item</AkBreadcrumbsItem>
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with many items, inside small container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <AkBreadcrumbs >
        <AkBreadcrumbsItem href="/item">Item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">Another item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">A third item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">A fourth item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">Yet another item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">An item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The next item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The item after the next item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The ninth item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">Item ten</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The last item</AkBreadcrumbsItem>
      </AkBreadcrumbs>
    </div>
  ));
