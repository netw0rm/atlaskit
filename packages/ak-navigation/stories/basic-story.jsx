import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { ContainerItem } from '../src/index';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';

const manyContainerItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <ContainerItem
        key={i}
        link={<a href="#1">Test page</a>}
      />
    );
  }
  return items;
};

storiesOf(name, module)
  .add('with a simple container item', () => (
    <Page>
      <BasicNavigation>
        <ContainerItem
          link={<a href="#1">Test page</a>}
        />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with many container items', () => (
    <Page>
      <BasicNavigation>
        {manyContainerItems()}
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('that starts closed', () => (
    <Page>
      <BasicNavigation open={false}>
        I should start closed
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
