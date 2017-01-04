import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { EmojiCustomIcon, DashboardIcon } from 'ak-icon';
import AkButton from 'ak-button';
import AkAvatar from 'ak-avatar';
import { name } from '../package.json';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup } from '../src/index';

const RandomAvatar = props => <AkAvatar
  {...props}
  size="small"
  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.round(Math.random() * 50)}.jpg`}
/>;

storiesOf(name, module)
  .add('with compact items', () => (
    <Page>
      <BasicNavigation containerHeader={null}>
        <a href="#1">
          <AkContainerItem
            isCompact
            icon={<RandomAvatar presence="online" />}
            text="Available"
          />
        </a>
        <a href="#1">
          <AkContainerItem
            isCompact
            icon={<DashboardIcon label="Lobby" />}
            text="Lobby"
          />
        </a>
        <AkContainerItemGroup
          title="Rooms"
          action={
            <AkButton
              spacing="none"
              iconBefore={<EmojiCustomIcon size="small" />}
              appearance="subtle"
            />
          }
        >
          <a href="#1">
            <AkContainerItem
              isCompact
              icon={<RandomAvatar />}
              text="Front deskers"
            />
          </a>
          <a href="#2">
            <AkContainerItem
              isCompact
              icon={<RandomAvatar />}
              text="Parents anonymous"
            />
          </a>
          <a href="#3">
            <AkContainerItem
              isCompact
              icon={<RandomAvatar />}
              text="Gone fishing"
            />
          </a>
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <a href="#4">
            <AkContainerItem
              isCompact
              icon={<RandomAvatar />}
              text="John Lennon"
            />
          </a>
          <a href="#5">
            <AkContainerItem
              isCompact
              icon={<RandomAvatar />}
              text="George Harrison"
            />
          </a>
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
