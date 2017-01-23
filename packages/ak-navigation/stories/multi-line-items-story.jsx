import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { CancelIcon, DashboardIcon, EmojiTravelIcon, EmojiNatureIcon } from 'ak-icon';
import { name } from '../package.json';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup, AkDrawerItem } from '../src/index';
import RandomBadge from './components/RandomBadge';

storiesOf(name, module)
  .add('with multi line items', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <AkContainerItemGroup>
            <AkDrawerItem
              href="#1"
              icon={<EmojiTravelIcon label="Travel" />}
              subText="With a second line of text"
              text="Create item 1"
            />
            <AkDrawerItem
              href="#2"
              icon={<DashboardIcon label="Dashboard" />}
              subText="Also with more text"
              text="Create item 2"
            />
          </AkContainerItemGroup>
        )}
      >
        <AkContainerItem
          href="#1"
          icon={<EmojiTravelIcon label="Travel" />}
          subText="With a second line"
          text="Item 1"
        />
        <AkContainerItem
          href="#2"
          icon={<DashboardIcon label="Dashboard" />}
          subText="With a very long second line of text"
          text="Item 2"
        />
        <AkContainerItemGroup title="With things at the end">
          <AkContainerItem
            action={<CancelIcon />}
            icon={<DashboardIcon label="Dashboard" />}
            subText="And two lines"
            text="With an action"
            textAfter={<RandomBadge />}
          />
          <AkContainerItem
            action={<CancelIcon />}
            icon={<EmojiNatureIcon label="Nature" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="With compact items">
          <AkContainerItem
            action={<CancelIcon />}
            isCompact
            subText="This should not be on the page"
            text="Should only see one line"
            textAfter={<RandomBadge />}
          />
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
