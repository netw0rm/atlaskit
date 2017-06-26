import { storiesOf } from '@storybook/react';
import React from 'react';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

import Breadcrumbs, { AkBreadcrumbsItem } from '../src';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Breadcrumbs, { AkBreadcrumbsItem }', 'ak-breadcrumbs'],
];
storiesOf(name, module)
  .addCodeExampleStory('simple ak-breadcrumbs', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/pages" text="Pages" />
      <AkBreadcrumbsItem href="/pages/home" text="Home" />
      <AkBreadcrumbsItem href="/pages/adg3" text="ADG 3 - New site" />
      <AkBreadcrumbsItem href="/pages/daccontent" text="design.atlassian.com content" />
      <AkBreadcrumbsItem href="/pages/product-design" text="Product design (draft)" />
      <AkBreadcrumbsItem href="/pages/patternsdesign" text="Patterns design (draft)" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with no items', () => (
    <Breadcrumbs />
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with one item', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/page" text="Page" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with one item with very long text', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/supercalifragilisticexpialidocious" text="Supercalifragilisticexpialidocious" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with icons', () => {
    const TestIcon = <AtlassianIcon label="Test icon" />;
    return (
      <div>
        <p>Using itemBefore and itemAfter API</p>
        <Breadcrumbs>
          <AkBreadcrumbsItem href="/item" text="No icon" />
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} text="Before" />
          <AkBreadcrumbsItem href="/item" iconAfter={TestIcon} text="After" />
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Before and after" />
          <AkBreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Long content, icons before and after" />
        </Breadcrumbs>
      </div>
    );
  }, {
    imports: [...imports, ['AtlassianIcon', 'ak-icon/glyph/atlassian']],
    overrides: {
      iconBefore: '<AtlassianIcon label="Test icon" />',
      iconAfter: '<AtlassianIcon label="Test icon" />',
    },
  })
  .addCodeExampleStory('ak-breadcrumbs with markup in item content', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/page" text="<b>Page</b>" />
      <AkBreadcrumbsItem href="/page" text="<script>alert();</script>" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with long and short items', () => (
    <Breadcrumbs>
      <AkBreadcrumbsItem href="/long" text="Supercalifragilisticexpialidocious" />
      <AkBreadcrumbsItem href="/short" text="Item" />
      <AkBreadcrumbsItem href="/short" text="Another item" />
      <AkBreadcrumbsItem href="/long" text="Long item name which should be truncated" />
      <AkBreadcrumbsItem href="/long" text="Another long item name which should be truncated" />
      <AkBreadcrumbsItem href="/short" text="Short item" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items', () => (
    <Breadcrumbs>
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
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items, inside container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <Breadcrumbs>
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
      </Breadcrumbs>
    </div>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items, with maximum 5 items', () => (
    <div>
      <p>Should automatically collapse if there are more than 5 items</p>
      <div style={{ maxWidth: '500px', border: '1px solid black' }}>
        <p>Exactly 5 items</p>
        <Breadcrumbs maxItems={5}>
          <AkBreadcrumbsItem href="/item" text="Item" />
          <AkBreadcrumbsItem href="/item" text="Another item" />
          <AkBreadcrumbsItem href="/item" text="A third item" />
          <AkBreadcrumbsItem href="/item" text="A fourth item with a very long name" />
          <AkBreadcrumbsItem href="/item" text="Item 5" />
        </Breadcrumbs>
      </div>
      <div style={{ maxWidth: '500px', border: '1px solid black' }}>
        <p>6 items</p>
        <Breadcrumbs maxItems={5}>
          <AkBreadcrumbsItem href="/item" text="Item" />
          <AkBreadcrumbsItem href="/item" text="Another item" />
          <AkBreadcrumbsItem href="/item" text="A third item" />
          <AkBreadcrumbsItem href="/item" text="A fourth item with a very long name" />
          <AkBreadcrumbsItem href="/item" text="Item 5" />
          <AkBreadcrumbsItem href="/item" text="A sixth item" />
        </Breadcrumbs>
      </div>
    </div>
  ), { imports });
