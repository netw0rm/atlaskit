import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props, Description } from 'akutil-readme';

import Breadcrumbs, { AkBreadcrumbsItem } from '../src';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import BreadcrumbsBasicUsage from './examples/breadcrumbs-basic-usage';
import BreadcrumbsBasicUsageRaw from '!raw!./examples/breadcrumbs-basic-usage';
import BreadcrumbsItemBasicUsage from './examples/breadcrumbs-item-basic-usage';
import BreadcrumbsItemBasicUsageRaw from '!raw!./examples/breadcrumbs-item-basic-usage';
/* eslint-enable import/first, import/no-duplicates */

const BreadcrumbsDescription = (<Description>
  <p> The Breadcrumbs component will render a list of slash-separated breadcrumb items, and will
  automatically truncate the list if there are more than 8 items.</p>
  <p>The default export of ak-breadcrumbs is the &quot;smart&quot; component which will take care of
   most of the props required for the &quot;dumb&quot; version</p>
  <p>Simply pass in `AkBreadcrumbsItems` as children and they should render as expected.</p>
  <p>If finer control is required, use the dumb (stateless) version</p>
</Description>);

// const BreadcrumbsDumbDescription = (<Description>
//   <p>Breadcrumb items are components for use inside Breadcrumbs to show location and hierarchy
//      information about where a user is located with an application</p>
//   <p>The &quot;dumb&quot; (stateless) version of Breadcrumbs allows finer control over how many
//   &quot;crumbs&quot; to show and how expanding should work</p>
// </Description>);

const BreadcrumbsItemDescription = (<Description>
  <p>Breadcrumb items are components for use inside Breadcrumbs to show location and hierarchy
     information about where a user is located with an application</p>
</Description>);

const BreadcrumbsPropsDescription = {
  children: 'Used to pass in AKBreadcrumbsItem components to render',
};

const BreadcrumbsItemPropsDescription = {
  href: 'The target URL',
  iconBefore: 'The icon to display before the item content. Icons specified in this way will always be displayed, even when the content is truncated.',
  iconAfter: 'The icon to display after the item content. Icons specified in this way will always be displayed, even when the content is truncated.',
  text: 'The text content of the item',
};

storiesOf(name, module)
  .add('Breadcrumbs Readme', () => (
    <div>
      <Readme
        component={name}
        description={BreadcrumbsDescription}
      >
        <Code code={BreadcrumbsBasicUsageRaw}>
          {BreadcrumbsBasicUsage}
        </Code>
        <Props component={Breadcrumbs} descriptions={BreadcrumbsPropsDescription} />
      </Readme>
    </div>
  ))
  .add('BreadcrumbsItem Readme', () => (
    <div>
      <Readme
        component={name}
        description={BreadcrumbsItemDescription}
      >
        <Code code={BreadcrumbsItemBasicUsageRaw}>
          {BreadcrumbsItemBasicUsage}
        </Code>
        <Props component={AkBreadcrumbsItem} descriptions={BreadcrumbsItemPropsDescription} />
      </Readme>
    </div>
  ));
