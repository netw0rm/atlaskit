// @flow

import React from 'react';
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Button from '@atlaskit/button';
import SingleSelect from '@atlaskit/single-select';
import TextField from '@atlaskit/field-text';
import { storiesOf } from '@kadira/storybook';
import PageHeader from '@atlaskit/page-header';

const StoryStyle = styled.div`
  padding: 0 ${akGridSizeUnitless * 4}px;
`;
const SpacingContainer = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;
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

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'sydney' },
      { content: 'Canberra', value: 'canberra' },
    ],
  },
];

const barContent = (
  <SpacingContainer>
    <TextField isLabelHidden placeholder="Filter" label="hidden" />
    <SingleSelect
      placeholder="Choose an option"
      items={selectItems}
    />
  </SpacingContainer>
);

storiesOf('@atlaskit/page-header', module, { clearPadding: true })
  .addDecorator(story => <StoryStyle>{story()}Some page content that follow the header</StoryStyle>)
  .add('simple header', () => <PageHeader>Hello</PageHeader>)
  .add('header with breadcrumbs', () => (
    <PageHeader breadcrumbs={breadcrumbs}>I have breadcrumbs</PageHeader>
  ))
  .add('with actions', () => (
    <PageHeader breadcrumbs={breadcrumbs} actions={actionsContent}>
      I have breadcrumbs & actions
    </PageHeader>
  ))
  .add('very long title', () => (
    <PageHeader breadcrumbs={breadcrumbs} actions={actionsContent}>
      I have a very long title, but I still show the actions and truncate the title. I have a very
      long title, but I still show the actions and truncate the title.
    </PageHeader>
  ))
  .add('with search bar', () => (
    <PageHeader breadcrumbs={breadcrumbs} actions={actionsContent} bottomBar={barContent}>
      I have everything!
    </PageHeader>
  ));
