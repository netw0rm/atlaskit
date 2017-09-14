import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { action } from '@kadira/storybook';
import { AkQuickSearch, AkNavigationItemGroup, quickSearchResultTypes } from '../../src';
import { RoomResult } from '../examples/quicksearch/ExtendingResultTypes';

const { PersonResult } = quickSearchResultTypes;

const getPersonAvatarUrl = identity => `http://api.adorable.io/avatar/32/${identity}`;
const getRoomAvatarUrl = idx => `http://lorempixel.com/32/32/nature/${idx}`;

const onClickAction = (item) => { action('onClick')(`resultId: ${item.resultId}`); };

const data = [
  {
    title: 'Jedi',
    items: [
      {
        resultId: '1',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(1),
        name: 'Jedi Council [archived]',
        onClick: onClickAction,
        privacy: 'private',
      }, {
        resultId: '2',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(2),
        name: 'Lightsaber colour discussion',
        topic: 'Please keep it civil. Strictly no red saber talk',
        onClick: onClickAction,
        privacy: 'public',
      }, {
        resultId: '3',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(3),
        name: 'Force tricks',
        topic: 'Impress your friends',
        onClick: onClickAction,
        privacy: 'private',
      }, {
        resultId: 'qgjinn',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('qgjinn'),
        mentionName: 'MasterQ',
        name: 'Qui-Gon Jinn',
        onClick: onClickAction,
        presenceMessage: 'On-call',
        presenceState: 'offline',
      }, {
        resultId: 'askywalker',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('askywalker'),
        mentionName: 'askywalker',
        name: 'Anakin Skywalker',
        onClick: onClickAction,
        presenceMessage: 'Trying out the dark side',
        presenceState: 'offline',
      }, {
        resultId: 'owkenobi',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('owkenobi'),
        mentionName: 'BenKen',
        name: 'Obi-Wan Kenobi',
        onClick: onClickAction,
        presenceMessage: 'In exile',
        presenceState: 'busy',
      }, {
        resultId: 'yoda',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('yoda'),
        mentionName: 'yoda',
        name: 'Yoda',
        onClick: onClickAction,
        presenceMessage: 'Chillin`',
        presenceState: 'online',
      }, {
        resultId: 'mwindu',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('mwindu'),
        mentionName: 'mwindu',
        name: 'Mace Windu',
        onClick: onClickAction,
        presenceState: 'offline',
      }, {
        resultId: 'lskywalker',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('lskywalker'),
        mentionName: 'lskywalker',
        name: 'Luke Skywalker',
        onClick: onClickAction,
        presenceMessage: 'Is this Yoda guy for real? lol',
        presenceState: 'online',
      },
    ],
  },
  {
    title: 'CSI',
    items: [
      {
        resultId: 'Forensics Lab',
        type: 'room',
        name: 'Forensics Lab',
        topic: 'Science!',
        avatarUrl: getRoomAvatarUrl(4),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Ballistics Lab',
        type: 'room',
        name: 'Ballistics Lab',
        topic: 'Pew pew pew',
        avatarUrl: getRoomAvatarUrl(5),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Cotton swab enthusiasts',
        type: 'room',
        name: 'Cotton swab enthusiasts',
        topic: 'So many applications',
        avatarUrl: getRoomAvatarUrl(6),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'David Caruso',
        type: 'person',
        name: 'David Caruso',
        mentionName: 'Horatio Caine',
        avatarUrl: getPersonAvatarUrl('hcaine'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Kim Delaney',
        type: 'person',
        name: 'Kim Delaney',
        mentionName: 'Megan Donner',
        avatarUrl: getPersonAvatarUrl('mdonner'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Emily Procter',
        type: 'person',
        name: 'Emily Procter',
        mentionName: 'Calleigh Duquesne',
        avatarUrl: getPersonAvatarUrl('cduqesne'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Adam Rodriguez',
        type: 'person',
        name: 'Adam Rodriguez',
        mentionName: 'Delko',
        avatarUrl: getPersonAvatarUrl('delko'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Khandi Alexander',
        type: 'person',
        name: 'Khandi Alexander',
        mentionName: 'Alexx Woods',
        avatarUrl: getPersonAvatarUrl('awoods'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Rory Cochrane',
        type: 'person',
        name: 'Rory Cochrane',
        mentionName: 'Tim Speedle',
        avatarUrl: getPersonAvatarUrl('tspeedle'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Rex Linn',
        type: 'person',
        name: 'Rex Linn',
        mentionName: 'Frank Tripp',
        avatarUrl: getPersonAvatarUrl('ftripp'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Eva LaRue',
        type: 'person',
        name: 'Eva LaRue',
        mentionName: 'Natalia Boa Vista',
        avatarUrl: getPersonAvatarUrl('`nboavista`'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Megalyn Echikunwoke',
        type: 'person',
        name: 'Megalyn Echikunwoke',
        mentionName: 'Tara Price',
        avatarUrl: getPersonAvatarUrl('tprice'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Eddie Cibrian',
        type: 'person',
        name: 'Eddie Cibrian',
        mentionName: 'Jesse Cardoza',
        avatarUrl: getPersonAvatarUrl('jcardoza'),
        href: 'http://www.atlassian.com',
      }, {
        resultId: 'Omar Benson Miller',
        type: 'person',
        name: 'Omar Benson Miller',
        mentionName: 'Walter Simmons',
        avatarUrl: getPersonAvatarUrl('wsimmons'),
        href: 'http://www.atlassian.com',
      },
    ],
  },
];

const availableResultTypes = {
  person: PersonResult,
  room: RoomResult,
};

const mapResultsDataToComponents = (resultData =>
  resultData.map(group => (
    <AkNavigationItemGroup title={group.title} key={group.title}>
      {group.items.map((props) => {
        const Result = availableResultTypes[props.type];
        return Result ? (
          <Result key={props.resultId} {...props} isSelected={false} />
          ) : null;
      })}
    </AkNavigationItemGroup>
  ))
);

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1;
}

function searchData(query) {
  const results =
    data
      .map(({ title, items }) => {
        const filteredItems = items.filter(
          item => contains(item.name, query)
        );
        return { title, items: filteredItems };
      })
      .filter(group => group.items.length);
  return results;
}

// a little fake store for holding the query after a component unmounts
const store = {};

export default class BasicQuickSearch extends PureComponent {
  static propTypes = {
    fakeNetworkLatency: PropTypes.number,
  }

  static defaultProps = {
    fakeNetworkLatency: 0,
  }

  state = {
    query: store.query || '',
    results: searchData(''),
  }

  setQuery(query) {
    store.query = query;
    this.setState({
      query,
    });
  }

  search = (query) => {
    clearTimeout(this.searchTimeoutId);
    this.setState({
      isLoading: true,
    });
    this.setQuery(query);
    const results = searchData(query);
    this.searchTimeoutId = setTimeout(() => {
      this.setState({
        results,
        isLoading: false,
      });
    }, this.props.fakeNetworkLatency);
  }

  render() {
    return (
      <AkQuickSearch
        /* Search props */
        isLoading={this.state.isLoading}
        onSearchInput={({ target }) => { this.search(target.value); }}
        value={this.state.query}
      >
        {mapResultsDataToComponents(this.state.results)}
      </AkQuickSearch>
    );
  }
}
