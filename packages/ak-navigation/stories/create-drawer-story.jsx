import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { BitbucketBranchesIcon, ConfluencePageIcon, FeedbackIcon, ProjectsIcon, EmojiObjectsIcon, EmojiNatureIcon, EmojiTravelIcon, ExpandIcon } from 'ak-icon';
import { AkDrawerItem, AkContainerItemGroup } from '../src/index';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import { name } from '../package.json';

const manyDrawerItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <AkDrawerItem text="Test create item" />
    );
  }
  return items;
};

storiesOf(name, module)
  .add('with create drawer open', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <div>
            <AkContainerItemGroup>
              <AkDrawerItem
                icon={<EmojiObjectsIcon />}
                text="Create item 1"
              />
              <AkDrawerItem
                icon={<EmojiNatureIcon />}
                text="Create item 2"
              />
              <AkDrawerItem
                icon={<EmojiObjectsIcon />}
                text="Create item 3"
              />
              <AkDrawerItem
                icon={<EmojiTravelIcon />}
                text="Create item 4"
              />
            </AkContainerItemGroup>
            <AkContainerItemGroup>
              <AkDrawerItem
                icon={<ExpandIcon />}
                text="See more"
              />
            </AkContainerItemGroup>
            <AkContainerItemGroup title="Group with title">
              <AkDrawerItem
                icon={<BitbucketBranchesIcon />}
                text={<span>Create a <strong>Bitbucket branch</strong></span>}
              />
              <AkDrawerItem
                icon={<ConfluencePageIcon />}
                text={<span>Create a <strong>Confluence page</strong></span>}
              />
            </AkContainerItemGroup>
          </div>
        )}
        openDrawer="create"
      />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with create drawer having many groups', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <div>
            <AkDrawerItem text="Item outside a group" />
            <AkContainerItemGroup title="Create item group">
              <AkDrawerItem
                icon={<img alt="icon" src={nucleus} />}
                text="Item with an icon"
              />
              <AkDrawerItem
                icon={<img alt="icon" src={nucleus} />}
                text="A really, really, quite long, actually super long item name"
              />
            </AkContainerItemGroup>
            <AkDrawerItem
              icon={<img alt="icon" src={nucleus} />}
              text="Item underneath group"
            />
            <AkContainerItemGroup>
              <AkDrawerItem
                icon={<FeedbackIcon />}
                text="Inside a group with no title"
              />
            </AkContainerItemGroup>
            <AkContainerItemGroup>
              <AkDrawerItem
                icon={<ProjectsIcon />}
                text="Inside a different group with no title"
              />
            </AkContainerItemGroup>
            <AkContainerItemGroup title="Items with highlighted nouns">
              <AkDrawerItem
                icon={<img alt="icon" src={nucleus} />}
                text={(<span>Create a new <strong>item</strong></span>)}
              />
              <AkDrawerItem text={(<span>Make an <strong>item</strong> appear</span>)} />
            </AkContainerItemGroup>
          </div>
        )}
        openDrawer="create"
      />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with create having many items', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <div>{manyDrawerItems()}</div>
        )}
        openDrawer="create"
      />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
