import React from 'react';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Context" key="Context" />
    <BreadcrumbsItem text="Page" key="Page" />
  </BreadcrumbsStateless>
);

export default () => <PageHeader breadcrumbs={breadcrumbs}>Hello world</PageHeader>;
