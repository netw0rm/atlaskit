import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { BitbucketBranchesIcon, PageIcon, FeedbackIcon, IssuesIcon, EmojiObjectsIcon, EmojiNatureIcon, EmojiTravelIcon, ExpandIcon } from '@atlaskit/icon';
import searchStencil from 'url-loader!./stencils/search.svg';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import { name } from '../package.json';

const manyNavigationItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <AkNavigationItem text="Test create item" />
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
            <AkNavigationItemGroup>
              <AkNavigationItem
                href="#1"
                icon={<EmojiObjectsIcon />}
                text="Create item 1"
              />
              <AkNavigationItem
                href="#2"
                icon={<EmojiNatureIcon />}
                text="Create item 2"
              />
              <AkNavigationItem
                href="#3"
                icon={<EmojiObjectsIcon />}
                text="Create item 3"
              />
              <AkNavigationItem
                href="#4"
                icon={<EmojiTravelIcon />}
                text="Create item 4"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup>
              <AkNavigationItem
                icon={<ExpandIcon />}
                text="See more"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup title="Group with title">
              <AkNavigationItem
                icon={<BitbucketBranchesIcon />}
                text={<span>Create a <strong>Bitbucket branch</strong></span>}
              />
              <AkNavigationItem
                icon={<PageIcon />}
                text={<span>Create a <strong>Confluence page</strong></span>}
              />
            </AkNavigationItemGroup>
          </div>
        )}
        openDrawer="create"
      />
    </Page>
  ))
  .add('with create drawer having many groups', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <div>
            <AkNavigationItem text="Item outside a group" />
            <AkNavigationItemGroup title="Create item group">
              <AkNavigationItem
                icon={<img alt="icon" src={nucleus} />}
                text="Item with an icon"
              />
              <AkNavigationItem
                icon={<img alt="icon" src={nucleus} />}
                text="A really, really, quite long, actually super long item name"
              />
            </AkNavigationItemGroup>
            <AkNavigationItem
              icon={<img alt="icon" src={nucleus} />}
              text="Item underneath group"
            />
            <AkNavigationItemGroup>
              <AkNavigationItem
                icon={<FeedbackIcon />}
                text="Inside a group with no title"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup>
              <AkNavigationItem
                icon={<IssuesIcon />}
                text="Inside a different group with no title"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup title="Items with highlighted nouns">
              <AkNavigationItem
                icon={<img alt="icon" src={nucleus} />}
                text={(<span>Create a new <strong>item</strong></span>)}
              />
              <AkNavigationItem text={(<span>Make an <strong>item</strong> appear</span>)} />
            </AkNavigationItemGroup>
          </div>
        )}
        openDrawer="create"
      />
    </Page>
  ))
  .add('with create having many items', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <div>{manyNavigationItems()}</div>
        )}
        openDrawer="create"
      />
    </Page>
  ))
  .addStencilStory('with a stencil when the search drawer is open', () => (
    <Page>
      <BasicNavigation openDrawer="search" />
    </Page>
  ), { image: searchStencil });
