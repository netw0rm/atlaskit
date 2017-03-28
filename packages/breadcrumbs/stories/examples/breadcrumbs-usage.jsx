import React from 'react';
import Breadcrumbs, { AkBreadcrumbsItem } from '@atlaskit/breadcrumbs';

export default (
  <Breadcrumbs>
    <AkBreadcrumbsItem href="/pages" text="Pages" />
    <AkBreadcrumbsItem href="/pages/home" text="Home" />
    <AkBreadcrumbsItem href="/pages/adg3" text="ADG 3 - New site" />
    <AkBreadcrumbsItem href="/pages/daccontent" text="design.atlassian.com content" />
    <AkBreadcrumbsItem href="/pages/product-design" text="Product design (draft)" />
    <AkBreadcrumbsItem href="/pages/patternsdesign" text="Patterns design (draft)" />
  </Breadcrumbs>
);
