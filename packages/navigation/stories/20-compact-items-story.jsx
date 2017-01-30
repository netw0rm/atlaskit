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
    action={<CancelIcon />}
    icon={<RandomAvatar />}
    isCompact
    text={children}
    textAfter={<RandomBadge />}
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
          href="#1"
          icon={<RandomAvatar presence="online" />}
          isCompact
          text="Available"
        />
        <AkContainerItem
          href="#2"
          icon={<DashboardIcon label="Lobby" />}
          isCompact
          text="Lobby"
        />
        <AkContainerItemGroup
          action={
            <AkButton
              appearance="subtle"
              iconBefore={<EmojiCustomIcon size="small" />}
              spacing="none"
            />
          }
          title="Rooms"
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
