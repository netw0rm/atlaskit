import { storiesOf } from '@kadira/storybook';
import React, { PropTypes } from 'react';
import Lorem from 'react-lorem-component';
import { EmojiCustomIcon, DashboardIcon, CancelIcon } from 'ak-icon';
import AkAvatar from 'ak-avatar';
import AkBadge from 'ak-badge';
import AkButton from 'ak-button';
import { name } from '../package.json';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup } from '../src/index';

const RandomAvatar = props => <AkAvatar
  {...props}
  size="small"
  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.round(Math.random() * 50)}.jpg`}
/>;

const CompactItem = ({ children }) => {
  const badgeNumber = Math.random() > 0.3 ? (Math.round(Math.random() * 200)) : 0;
  return (<AkContainerItem
    isCompact
    icon={<RandomAvatar />}
    text={children}
    textAfter={
      badgeNumber > 0 ? <AkBadge
        appearance={Math.random() > 0.5 ? 'primary' : null}
        value={badgeNumber}
      /> : null
    }
    action={<CancelIcon />}
  />);
};

CompactItem.propTypes = {
  children: PropTypes.node,
};

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
