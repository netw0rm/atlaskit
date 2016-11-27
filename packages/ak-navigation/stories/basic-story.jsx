import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { AkContainerItem } from '../src/index';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import { name } from '../package.json';

const manyContainerItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <a href="#1" key={i}>
        <AkContainerItem
          text={'Test page'}
        />
      </a>
    );
  }
  return items;
};

storiesOf(name, module)
  .add('with a simple container item', () => (
    <Page>
      <BasicNavigation>
        <a href="#1">
          <AkContainerItem
            text={'Test page'}
          />
        </a>
        <a href="#2">
          <AkContainerItem
            icon={<img src={nucleus} alt="icon" />}
            text={'Item with an icon'}
          />
        </a>
        <a href="#3">
          <AkContainerItem
            icon={<img src={nucleus} alt="icon" />}
            text={'A really, really, quite long, actually super long container name'}
          />
        </a>
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
