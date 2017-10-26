import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import nucleusImage from './nucleus.png';

import Breadcrumbs, { BreadcrumbsItem } from '../src';
import { name } from '../package.json';

const imports: Array<Array<string>> = [
  ['React', 'react'],
  ['Breadcrumbs, { BreadcrumbsItem }', 'ak-breadcrumbs'],
];

const clickPreventDefaultHandler = (e) => {
  e.preventDefault();
  action('Click with prevent default')();
};

storiesOf(name, module)
  .addCodeExampleStory('simple ak-breadcrumbs', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/pages" text="Pages" />
      <BreadcrumbsItem href="/pages/home" text="Home" />
      <BreadcrumbsItem href="/pages/adg3" text="ADG 3 - New site" />
      <BreadcrumbsItem href="/pages/daccontent" text="design.atlassian.com content" />
      <BreadcrumbsItem href="/pages/product-design" text="Product design (draft)" />
      <BreadcrumbsItem href="/pages/patternsdesign" text="Patterns design (draft)" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with no items', () => (
    <Breadcrumbs />
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with one item', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/page" text="Page" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with icons', () => {
    const TestIcon = <AtlassianIcon label="Test icon" />;
    return (
      <div>
        <p>Using itemBefore and itemAfter API</p>
        <Breadcrumbs>
          <BreadcrumbsItem href="/item" text="No icon" />
          <BreadcrumbsItem href="/item" iconBefore={TestIcon} text="Before" />
          <BreadcrumbsItem href="/item" iconAfter={TestIcon} text="After" />
          <BreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Before and after" />
          <BreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Long content, icons before and after" />
        </Breadcrumbs>
      </div>
    );
  }, {
    imports: [...imports, ['AtlassianIcon', '@atlaskit/icon/glyph/atlassian']],
    overrides: {
      iconBefore: '<AtlassianIcon label="Test icon" />',
      iconAfter: '<AtlassianIcon label="Test icon" />',
    },
  })
  .addCodeExampleStory('ak-breadcrumbs with markup in item content', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/page" text="<b>Page</b>" />
      <BreadcrumbsItem href="/page" text="<script>alert();</script>" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/item" text="Item" />
      <BreadcrumbsItem href="/item" text="Another item" />
      <BreadcrumbsItem href="/item" text="A third item" />
      <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
      <BreadcrumbsItem href="/item" text="Yet another item" />
      <BreadcrumbsItem href="/item" text="An item" />
      <BreadcrumbsItem href="/item" text="The next item" />
      <BreadcrumbsItem href="/item" text="The item after the next item" />
      <BreadcrumbsItem href="/item" text="The ninth item" />
      <BreadcrumbsItem href="/item" text="Item ten" />
      <BreadcrumbsItem href="/item" text="The last item" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items, inside container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/item" text="Item" />
        <BreadcrumbsItem href="/item" text="Another item" />
        <BreadcrumbsItem href="/item" text="A third item" />
        <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
        <BreadcrumbsItem href="/item" text="Yet another item" />
        <BreadcrumbsItem href="/item" text="An item" />
        <BreadcrumbsItem href="/item" text="The next item" />
        <BreadcrumbsItem href="/item" text="The item after the next item" />
        <BreadcrumbsItem href="/item" text="The ninth item" />
        <BreadcrumbsItem href="/item" text="Item ten" />
        <BreadcrumbsItem href="/item" text="The last item" />
      </Breadcrumbs>
    </div>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items, with maximum 5 items', () => (
    <div>
      <p>Should automatically collapse if there are more than 5 items</p>
      <div style={{ maxWidth: '500px', border: '1px solid black' }}>
        <p>Exactly 5 items</p>
        <Breadcrumbs maxItems={5}>
          <BreadcrumbsItem href="/item" text="Item" />
          <BreadcrumbsItem href="/item" text="Another item" />
          <BreadcrumbsItem href="/item" text="A third item" />
          <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
          <BreadcrumbsItem href="/item" text="Item 5" />
        </Breadcrumbs>
      </div>
      <div style={{ maxWidth: '500px', border: '1px solid black' }}>
        <p>6 items</p>
        <Breadcrumbs maxItems={5}>
          <BreadcrumbsItem href="/item" text="Item" />
          <BreadcrumbsItem href="/item" text="Another item" />
          <BreadcrumbsItem href="/item" text="A third item" />
          <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
          <BreadcrumbsItem href="/item" text="Item 5" />
          <BreadcrumbsItem href="/item" text="A sixth item" />
        </Breadcrumbs>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with items having href and onClick handler', () => (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem
          href="/item1"
          onClick={clickPreventDefaultHandler}
          text="Item1 with onClick which prevents default"
        />
        <BreadcrumbsItem
          href="/item2"
          onClick={clickPreventDefaultHandler}
          text="Item2 with onClick which prevents default"
        />
      </Breadcrumbs>
    </div>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with items having onClick handler and no href', () => (
    <div>
      <Breadcrumbs>
        <BreadcrumbsItem onClick={action('Item1 click')} text="Item1 with onClick" />
        <BreadcrumbsItem onClick={action('Item2 Click')} text="Item2 with onClick" />
      </Breadcrumbs>
    </div>
  ), { imports })
  .addCodeExampleStory('with truncation and icons', () => {
    const TestIcon = <AtlassianIcon label="Test icon" />;
    return (
      <div>
        <p>Using itemBefore and itemAfter API</p>
        <Breadcrumbs>
          <BreadcrumbsItem truncationWidth={200} href="/long" text="Supercalifragilisticexpialidocious" />
          <BreadcrumbsItem truncationWidth={200} href="/short" text="Item" />
          <BreadcrumbsItem truncationWidth={200} href="/short" text="Another item" />
          <BreadcrumbsItem truncationWidth={200} href="/long" text="Long item name which should be truncated" />
          <BreadcrumbsItem truncationWidth={200} href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Before and after" />
          <BreadcrumbsItem truncationWidth={200} href="/long" text="Another long item name which should be truncated" />
          <BreadcrumbsItem truncationWidth={200} href="/short" text="Short item" />
          <BreadcrumbsItem
            truncationWidth={200}
            href="/item"
            iconBefore={TestIcon}
            iconAfter={TestIcon}
            text="Long content, icons before and after"
          />
        </Breadcrumbs>
      </div>
    );
  }, {
    imports: [...imports, ['AtlassianIcon', '@atlaskit/icon/glyph/atlassian']],
    overrides: {
      iconBefore: '<AtlassianIcon label="Test icon" />',
      iconAfter: '<AtlassianIcon label="Test icon" />',
    },
  })
  .addCodeExampleStory('ak-breadcrumbs with items having onClick handler and no href', () => {
    const icon1 = <img alt="icon2" src={nucleusImage} height="16px" width="16px" />;
    const icon2 = <img alt="icon1" src={nucleusImage} height="16px" width="16px" />;

    return (
      <div>
        <Breadcrumbs>
          <BreadcrumbsItem
            truncationWidth={200}
            text="some very very long text to be truncated"
            iconBefore={icon1}
          />
          <BreadcrumbsItem text="some other text" iconBefore={icon2} />
        </Breadcrumbs>
      </div>
    );
  }, { imports })
;
