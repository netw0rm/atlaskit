import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import BreadcrumbsExample from './BreadcrumbsExample';
import breadcrumbsExampleSrc from '!raw-loader!./BreadcrumbsExample';
import BreadcrumbsExpand from './BreadcrumbsExpand';
import breadcrumbsExpandSrc from '!raw-loader!./BreadcrumbsExpand';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      Breadcrumbs are used for nested navigation, displaying with each item
      acting as a link. There are three components exported, of which you will
      need two. Most commonly you will need:
    </p>
    <Usage>
      {"import { AkBreadcrumbs, AkBreadcrumbsItem } from '@atlaskit/breadcrumbs';"}
    </Usage>
    <p>
      <code>Breadcrumbs</code> for
      the wrapper component, and <code>BreadcrumbsItem</code> for individual items
      in the list.
    </p>
    <p>
      A <code>Breadcrumbs</code> component with no items will simply not display.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: BreadcrumbsExample,
    src: breadcrumbsExampleSrc,
  },
  {
    title: 'With maxItems Exceeded',
    Component: BreadcrumbsExpand,
    src: breadcrumbsExpandSrc,
  },
];
