import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { CrossIcon, DashboardIcon, EmojiTravelIcon, EmojiNatureIcon } from '@atlaskit/icon';
import { name } from '../package.json';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup, AkDrawerItem } from '../src/index';
import RandomBadge from './components/RandomBadge';

storiesOf(name, module)
  .add('with multi line items', () => (
    <Page>
      <BasicNavigation
        createDrawerContent={(
          <div>
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
          </div>
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
            action={<CrossIcon label="close" />}
            icon={<DashboardIcon label="Dashboard" />}
            subText="And two lines"
            text="With an action"
            textAfter={<RandomBadge />}
          />
          <AkContainerItem
            action={<CrossIcon label="close" />}
            icon={<EmojiNatureIcon label="Nature" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="With compact items">
          <AkContainerItem
            action={<CrossIcon label="close" />}
            isCompact
            subText="Text with y, q, etc."
            text="Should have even smaller subText"
            textAfter={<RandomBadge />}
          />
          <AkContainerItem
            isCompact
            subText="There's nothing quite like Parkay's squeeze™"
            text="Should have even smaller subText"
            textAfter={<RandomBadge />}
          />
        </AkContainerItemGroup>
      </BasicNavigation>
    </Page>
  ));
