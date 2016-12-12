import { storiesOf } from '@kadira/storybook';
import React from 'react';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

import AkBreadcrumbs, { AkBreadcrumbsItem } from '../src';
import { name } from '../package.json';


storiesOf(name, module)
  .add('simple ak-breadcrumbs', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/pages" text="Pages" />
      <AkBreadcrumbsItem href="/pages/home" text="Home" />
      <AkBreadcrumbsItem href="/pages/adg3" text="ADG 3 - New site" />
      <AkBreadcrumbsItem href="/pages/daccontent" text="design.atlassian.com content" />
      <AkBreadcrumbsItem href="/pages/product-design" text="Product design (draft)" />
      <AkBreadcrumbsItem href="/pages/patternsdesign" text="Patterns design (draft)" />
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with no items', () => (
    <AkBreadcrumbs />
  ))
  .add('ak-breadcrumbs with one item', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/page" text="Page" />
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with one item with very long text', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/supercalifragilisticexpialidocious" text="Supercalifragilisticexpialidocious" />
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with icons', () => {
    const TestIcon = <AtlassianIcon label="Test icon" />;
    return (
      <div>
        <p>Using itemBefore and itemAfter API</p>
        <AkBreadcrumbs>
          <AkBreadcrumbsItem href="/item" text="No icon" />
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} text="Before" />
          <AkBreadcrumbsItem href="/item" iconAfter={TestIcon} text="After" />
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Before and after" />
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Long content, icons before and after" />
        </AkBreadcrumbs>
      </div>
    );
  })
  .add('ak-breadcrumbs with markup in item content', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/page" text="<b>Page</b>" />
      <AkBreadcrumbsItem href="/page" text="<script>alert();</script>" />
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with long and short items', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/long" text="Supercalifragilisticexpialidocious" />
      <AkBreadcrumbsItem href="/short" text="Item" />
      <AkBreadcrumbsItem href="/short" text="Another item" />
      <AkBreadcrumbsItem href="/long" text="Long item name which should be truncated" />
      <AkBreadcrumbsItem href="/long" text="Another long item name which should be truncated" />
      <AkBreadcrumbsItem href="/short" text="Short item" />
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with many items', () => (
    <AkBreadcrumbs>
      <AkBreadcrumbsItem href="/item" text="Item" />
      <AkBreadcrumbsItem href="/item" text="Another item" />
      <AkBreadcrumbsItem href="/item" text="A third item" />
      <AkBreadcrumbsItem href="/item" text="A fourth item with a very long name" />
      <AkBreadcrumbsItem href="/item" text="Yet another item" />
      <AkBreadcrumbsItem href="/item" text="An item" />
      <AkBreadcrumbsItem href="/item" text="The next item" />
      <AkBreadcrumbsItem href="/item" text="The item after the next item" />
      <AkBreadcrumbsItem href="/item" text="The ninth item" />
      <AkBreadcrumbsItem href="/item" text="Item ten" />
      <AkBreadcrumbsItem href="/item" text="The last item" />
    </AkBreadcrumbs>
  ))
  .add('ak-breadcrumbs with many items, inside small container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <AkBreadcrumbs>
        <AkBreadcrumbsItem href="/item" text="Item" />
        <AkBreadcrumbsItem href="/item" text="Another item" />
        <AkBreadcrumbsItem href="/item" text="A third item" />
        <AkBreadcrumbsItem href="/item" text="A fourth item with a very long name" />
        <AkBreadcrumbsItem href="/item" text="Yet another item" />
        <AkBreadcrumbsItem href="/item" text="An item" />
        <AkBreadcrumbsItem href="/item" text="The next item" />
        <AkBreadcrumbsItem href="/item" text="The item after the next item" />
        <AkBreadcrumbsItem href="/item" text="The ninth item" />
        <AkBreadcrumbsItem href="/item" text="Item ten" />
        <AkBreadcrumbsItem href="/item" text="The last item" />
      </AkBreadcrumbs>
    </div>
  ));
