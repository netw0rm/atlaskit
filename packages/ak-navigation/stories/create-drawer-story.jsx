import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { AkDrawerItem, AkContainerItemGroup } from '../src/index';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import { name } from '../package.json';

const manyDrawerItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <AkDrawerItem
        text="Test create item"
      />
    );
  }
  return items;
};

storiesOf(name, module)
  .add('with create drawer open', () => (
    <Page>
      <BasicNavigation
        openDrawer="create"
        createDrawerContent={(
          <div>
            <AkDrawerItem
              text="Item outside a group"
            />
            <AkContainerItemGroup
              title="Create item group"
            >
              <AkDrawerItem
                icon={<img src={nucleus} alt="icon" />}
                text="Item with an icon"
              />
              <AkDrawerItem
                icon={<img src={nucleus} alt="icon" />}
                text="A really, really, quite long, actually super long container name"
              />
            </AkContainerItemGroup>
            <AkDrawerItem
              icon={<img src={nucleus} alt="icon" />}
              text="Item underneath group"
            />
            <AkContainerItemGroup>
              <AkDrawerItem
                icon={<img src={nucleus} alt="icon" />}
                text="Inside a group with no title"
              />
            </AkContainerItemGroup>
            <AkContainerItemGroup
              title="Items with highlighted nouns"
            >
              <AkDrawerItem
                icon={<img src={nucleus} alt="icon" />}
                text={(<span>Create a new <strong>item</strong></span>)}
              />
              <AkDrawerItem
                text={(<span>Make an <strong>item</strong> appear</span>)}
              />
            </AkContainerItemGroup>
          </div>
      )}
      />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with create having many items', () => (
    <Page>
      <BasicNavigation
        openDrawer="create"
        createDrawerContent={(
          <div>{manyDrawerItems()}</div>
        )}
      />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
