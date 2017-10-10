import React from 'react';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';

import Button from '@atlaskit/button';
import TextField from '@atlaskit/field-text';
import { StatelessSelect } from '@atlaskit/single-select';

import SpacingContainer from './spacing-container';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Context" key="Context" />
    <BreadcrumbsItem text="Page" key="Page" />
  </BreadcrumbsStateless>
);
const actionsContent = (
  <SpacingContainer>
    <Button appearance="primary">Primary Action</Button>
    <Button>Default</Button>
    <Button>...</Button>
  </SpacingContainer>
);
const barContent = (
  <SpacingContainer>
    <TextField isLabelHidden placeholder="Filter" label="hidden" />
    <StatelessSelect placeholder="Choose an option" />
  </SpacingContainer>
);

export default () => (
  <PageHeader breadcrumbs={breadcrumbs} actions={actionsContent} bottomBar={barContent}>
    I have everything!
  </PageHeader>
);
