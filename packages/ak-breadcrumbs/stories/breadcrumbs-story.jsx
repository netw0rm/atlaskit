import { storiesOf } from '@kadira/storybook';
import React from 'react';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

import Breadcrumbs, { AkBreadcrumbsItem } from '../src';
import { name } from '../package.json';


storiesOf(name, module)
  .add('simple ak-breadcrumbs', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/pages">Pages</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/home">Home</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/adg3">ADG 3 - New site</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/daccontent">design.atlassian.com content</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/product-design">Product design (draft)</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/pages/patternsdesign">Patterns design (draft)</AkBreadcrumbsItem>
    </Breadcrumbs>
  ))
  .add('ak-breadcrumbs with no items', () => (
    <Breadcrumbs />
  ))
  .add('ak-breadcrumbs with one item', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/page">Page</AkBreadcrumbsItem>
    </Breadcrumbs>
  ))
  .add('ak-breadcrumbs with one item with very long text', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/supercalifragilisticexpialidocious">
        Supercalifragilisticexpialidocious
      </AkBreadcrumbsItem>
    </Breadcrumbs>
  ))
  .add('ak-breadcrumbs with icons', () => {
    const TestIcon = <AtlassianIcon label="Test icon" />;
    return (
      <div>
        <p>Using itemBefore and itemAfter API</p>
        <Breadcrumbs>
          <AkBreadcrumbsItem href="/item">No icon</AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon}>Before</AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item" iconAfter={TestIcon}>After</AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon}>
            Before and after
          </AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon}>
            Long content, icons before and after
          </AkBreadcrumbsItem>
        </Breadcrumbs>
        <p>With icons in the content</p>
        <Breadcrumbs>
          <AkBreadcrumbsItem href="/item">No icon</AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item">{TestIcon} Before</AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item">After {TestIcon}</AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item">
            {TestIcon} Before and after {TestIcon}
          </AkBreadcrumbsItem>
          <AkBreadcrumbsItem href="/item">
            {TestIcon} Long content, icons before and after {TestIcon}
          </AkBreadcrumbsItem>
        </Breadcrumbs>
      </div>
    );
  })
  .add('ak-breadcrumbs with markup in item content', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/page"><b>Page</b></AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/page">
        With icon <AtlassianIcon label="Atlassian icon" />
      </AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/page">
        <span>Long page name with <b>markup</b> <i>(should be truncated)</i></span>
        <span> and icon <AtlassianIcon label="Atlassian icon" /></span>
      </AkBreadcrumbsItem>
    </Breadcrumbs>
  ))
  .add('ak-breadcrumbs with long and short items', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/long">Supercalifragilisticexpialidocious</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/short">Item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/short">Another item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/long">Long item name which should be truncated</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/long">Another long item name which should be truncated</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/short">Short item</AkBreadcrumbsItem>
    </Breadcrumbs>
  ))
  .add('ak-breadcrumbs with many items', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/item">Item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Another item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">A third item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">A fourth item with a very long name</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Yet another item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">An item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The next item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The item after the next item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The ninth item</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">Item ten</AkBreadcrumbsItem>
      <AkBreadcrumbsItem href="/item">The last item</AkBreadcrumbsItem>
    </Breadcrumbs>
  ))
  .add('ak-breadcrumbs with many items, inside small container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <Breadcrumbs>
        <AkBreadcrumbsItem href="/item">Item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">Another item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">A third item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">A fourth item with a very long name</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">Yet another item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">An item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The next item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The item after the next item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The ninth item</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">Item ten</AkBreadcrumbsItem>
        <AkBreadcrumbsItem href="/item">The last item</AkBreadcrumbsItem>
      </Breadcrumbs>
    </div>
  ));
