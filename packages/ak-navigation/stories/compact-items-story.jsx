import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { EmojiCustomIcon, DashboardIcon, CancelIcon } from 'ak-icon';
import AkAvatar from 'ak-avatar';
import AkButton from 'ak-button';
import { name } from '../package.json';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup } from '../src/index';
import RandomBadge from './components/RandomBadge';

const RandomAvatar = props => <AkAvatar
  {...props}
  size="small"
  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.round(Math.random() * 50)}.jpg`}
/>;

const CompactItem = ({ children }) => (
  <AkContainerItem
    isCompact
    icon={<RandomAvatar />}
    text={children}
    textAfter={<RandomBadge />}
    action={<CancelIcon />}
  />
);

CompactItem.propTypes = {
  children: PropTypes.node,
};

storiesOf(name, module)
  .add('with compact items', () => (
    <Page>
      <BasicNavigation containerHeader={null}>
        <AkContainerItem
          isCompact
          icon={<RandomAvatar presence="online" />}
          text="Available"
          href="#1"
        />
        <AkContainerItem
          isCompact
          icon={<DashboardIcon label="Lobby" />}
          text="Lobby"
          href="#2"
        />
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
          <CompactItem href="#1">Front deskers</CompactItem>
          <CompactItem href="#2">Parents anonymous</CompactItem>
          <CompactItem href="#3">Gone fishing</CompactItem>
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <CompactItem href="#4">John Lennon</CompactItem>
          <CompactItem href="#5">George Harrison</CompactItem>
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
