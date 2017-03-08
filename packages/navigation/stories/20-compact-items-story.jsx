import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import { EmojiCustomIcon, DashboardIcon, CrossIcon } from '@atlaskit/icon';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import { name } from '../package.json';
import Page from './components/HtmlPage';
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
    action={<CrossIcon label="close" />}
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
        <AkContainerItem
          icon={<RandomAvatar presence="online" />}
          isCompact
          text="Available"
        />
        <AkContainerItem
          icon={<DashboardIcon label="Lobby" />}
          isCompact
          text="Lobby"
        />
        <AkContainerItemGroup
          action={
            <AkButton
              appearance="subtle"
              iconBefore={<EmojiCustomIcon label="add" size="small" />}
              spacing="none"
            />
          }
          title="Rooms"
        >
          <CompactItem href="#1">Front deskers</CompactItem>
          <CompactItem href="#2">Parents anonymous</CompactItem>
          <CompactItem href="#3">Gone fishing</CompactItem>
        </AkContainerItemGroup>
        <AkContainerItemGroup title="Rooms">
          <CompactItem>Front deskers</CompactItem>
          <CompactItem>Parents anonymous</CompactItem>
          <CompactItem>Gone fishing</CompactItem>
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <CompactItem>John Lennon</CompactItem>
          <CompactItem>George Harrison</CompactItem>
        </AkContainerItemGroup>
        <AkContainerItemGroup hasSeparator>
          <CompactItem isSelected >Mick Jagger </CompactItem>
          <CompactItem>Ronnie Wood</CompactItem>
        </AkContainerItemGroup>
      </BasicNavigation>
    </Page>
  ));
