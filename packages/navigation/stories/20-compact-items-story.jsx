import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { EmojiCustomIcon, DashboardIcon, CrossIcon } from '@atlaskit/icon';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
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
    action={<CrossIcon />}
    icon={<RandomAvatar />}
    isCompact
    text={children}
    textAfter={<RandomBadge />}
    subText={Math.random() > 0.5 && 'This is some really long sub text'}
  />
);

CompactItem.propTypes = {
  children: PropTypes.node,
};

storiesOf(name, module)
  .add('with compact items', () => (
    <Page>
      <BasicNavigation containerHeaderComponent={null}>
        <a href="#1">
          <AkContainerItem
            icon={<RandomAvatar presence="online" />}
            isCompact
            text="Available"
          />
        </a>
        <a href="#1">
          <AkContainerItem
            icon={<DashboardIcon label="Lobby" />}
            isCompact
            text="Lobby"
          />
        </a>
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
          <a href="#1">
            <CompactItem>Front deskers</CompactItem>
          </a>
          <a href="#2">
            <CompactItem>Parents anonymous</CompactItem>
          </a>
          <a href="#3">
            <CompactItem>Gone fishing</CompactItem>
          </a>
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <a href="#4">
            <CompactItem>John Lennon</CompactItem>
          </a>
          <a href="#5">
            <CompactItem>George Harrison</CompactItem>
          </a>
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
