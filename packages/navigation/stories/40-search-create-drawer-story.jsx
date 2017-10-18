import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import BitbucketBranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches';
import PageIcon from '@atlaskit/icon/glyph/page';
import FeedbackIcon from '@atlaskit/icon/glyph/feedback';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import EmojiObjectsIcon from '@atlaskit/icon/glyph/emoji/objects';
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature';
import EmojiTravelIcon from '@atlaskit/icon/glyph/emoji/travel';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import { AkCreateDrawer, AkNavigationItem, AkNavigationItemGroup } from '../src/index';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import BasicSearch from './components/BasicSearch';
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

const VerticallyCenteredDrawerContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

storiesOf(name, module)
  .add('with create drawer open', () => (
    <HtmlPage>
      <BasicNavigation
        createDrawerContent={(
          <div>
            <AkNavigationItemGroup>
              <AkNavigationItem
                href="#1"
                icon={<EmojiObjectsIcon label="emoji objects icon" />}
                text="Create item 1"
              />
              <AkNavigationItem
                href="#2"
                icon={<EmojiNatureIcon label="emoji nature icon" />}
                text="Create item 2"
              />
              <AkNavigationItem
                href="#3"
                icon={<EmojiObjectsIcon label="emoji objects icon" />}
                text="Create item 3"
              />
              <AkNavigationItem
                href="#4"
                icon={<EmojiTravelIcon label="emoji travel icon" />}
                text="Create item 4"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup>
              <AkNavigationItem
                icon={<ExpandIcon label="expand icon" />}
                text="See more"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup title="Group with title">
              <AkNavigationItem
                icon={<BitbucketBranchesIcon label="bitbucket icon" />}
                text={<span>Create a <strong>Bitbucket branch</strong></span>}
              />
              <AkNavigationItem
                icon={<PageIcon label="page icon" />}
                text={<span>Create a <strong>Confluence page</strong></span>}
              />
            </AkNavigationItemGroup>
          </div>
        )}
        openDrawer="create"
      />
    </HtmlPage>
  ))
  .add('with create drawer having many groups', () => (
    <HtmlPage>
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
                icon={<FeedbackIcon label="feedback icon" />}
                text="Inside a group with no title"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup>
              <AkNavigationItem
                icon={<IssuesIcon label="issues icon" />}
                text="Inside a different group with no title"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup title="Items with highlighted nouns">
              <AkNavigationItem
                icon={<img alt="icon" src={nucleus} />}
                text={(<span>Create a new <strong>item</strong></span>)}
              />
              <AkNavigationItem text={(<span>Make an <strong>item</strong> appear</span>)} />
              <AkNavigationItem text={(<span>Make an <strong>ball</strong> appear</span>)} />
              <AkNavigationItem text={(<span>Make an <strong>bed</strong> appear</span>)} />
              <AkNavigationItem text={(<span>Make an <strong>pool</strong> appear</span>)} />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup title="Items with highlighted verbs">
              <AkNavigationItem
                icon={<img alt="icon" src={nucleus} />}
                text={(<span><strong>Create</strong> a new item</span>)}
              />
              <AkNavigationItem text={(<span><strong>Make</strong> an item appear</span>)} />
              <AkNavigationItem text={(<span><strong>Make</strong> an ball appear</span>)} />
              <AkNavigationItem text={(<span><strong>Make</strong> an bed appear</span>)} />
              <AkNavigationItem text={(<span><strong>Make</strong> an pool appear</span>)} />
            </AkNavigationItemGroup>
          </div>
        )}
        openDrawer="create"
      />
    </HtmlPage>
  ))
  .add('with create having many items', () => (
    <HtmlPage>
      <BasicNavigation
        createDrawerContent={(
          <div>{manyNavigationItems()}</div>
        )}
        openDrawer="create"
      />
    </HtmlPage>
  ))
  .add('with search delay', () => (
    <HtmlPage>
      <BasicNavigation
        searchDrawerContent={(
          <BasicSearch fakeNetworkLatency={800} />
        )}
        openDrawer="search"
      />
    </HtmlPage>
  ))
  .add('with vertically-centered drawer content', () => (
    <HtmlPage>
      <BasicNavigation
        drawers={[
          <AkCreateDrawer
            backIcon={<ArrowLeftIcon label="Back icon" size="medium" />}
            isFullWidth
            isOpen
            key="create"
            primaryIcon={<AtlassianIcon label="Atlassian icon" size="medium" />}
            onBackButton={() => {}}
          >
            <VerticallyCenteredDrawerContent>
              <p>This content should be vertically centered.</p>
            </VerticallyCenteredDrawerContent>
          </AkCreateDrawer>,
        ]}
      />
    </HtmlPage>
  ));
