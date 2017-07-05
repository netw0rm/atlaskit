import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AkQuickSearch, AkQuickSearchWithKeyboardControls } from '../../src/index';
import { action } from '@kadira/storybook';

const getPersonAvatarUrl = identity => `http://api.adorable.io/avatar/32/${identity}`;
const getRoomAvatarUrl = idx => `http://lorempixel.com/32/32/nature/${idx}`;

const data = [
  {
    title: 'Jedi',
    items: [
      {
        id: '1',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(1),
        name: 'Jedi Council [archived]',
        privacy: 'private',
      }, {
        id: '2',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(2),
        name: 'Lightsaber colour discussion',
        topic: 'Please keep it civil. Strictly no red saber talk',
        privacy: 'public',
      }, {
        id: '3',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(3),
        name: 'Force tricks',
        topic: 'Impress your friends',
        privacy: 'private',
      }, {
        id: 'qgjinn',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('qgjinn'),
        mentionName: 'MasterQ',
        name: 'Qui-Gon Jinn',
        presenceMessage: 'On-call',
        presenceState: 'offline',
      }, {
        id: 'askywalker',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('askywalker'),
        mentionName: 'askywalker',
        name: 'Anakin Skywalker',
        presenceMessage: 'Trying out the dark side',
        presenceState: 'offline',
      }, {
        id: 'owkenobi',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('owkenobi'),
        mentionName: 'BenKen',
        name: 'Obi-Wan Kenobi',
        presenceMessage: 'In exile',
        presenceState: 'busy',
      }, {
        id: 'yoda',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('yoda'),
        mentionName: 'yoda',
        name: 'Yoda',
        presenceMessage: 'Chillin`',
        presenceState: 'online',
      }, {
        id: 'mwindu',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('mwindu'),
        mentionName: 'mwindu',
        name: 'Mace Windu',
        presenceState: 'offline',
      }, {
        id: 'lskywalker',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('lskywalker'),
        mentionName: 'lskywalker',
        name: 'Luke Skywalker',
        presenceMessage: 'Is this Yoda guy for real? lol',
        presenceState: 'online',
      },
    ],
  },
  {
    title: 'CSI',
    items: [
      {
        id: 'Forensics Lab',
        type: 'room',
        name: 'Forensics Lab',
        topic: 'Science!',
        avatarUrl: getRoomAvatarUrl(4),
      }, {
        id: 'Ballistics Lab',
        type: 'room',
        name: 'Ballistics Lab',
        topic: 'Pew pew pew',
        avatarUrl: getRoomAvatarUrl(5),
      }, {
        id: 'Cotton swab enthusiasts',
        type: 'room',
        name: 'Cotton swab enthusiasts',
        topic: 'So many applications',
        avatarUrl: getRoomAvatarUrl(6),
      }, {
        id: 'David Caruso',
        type: 'person',
        name: 'David Caruso',
        mentionName: 'Horatio Caine',
        avatarUrl: getPersonAvatarUrl('hcaine'),
      }, {
        id: 'Kim Delaney',
        type: 'person',
        name: 'Kim Delaney',
        mentionName: 'Megan Donner',
        avatarUrl: getPersonAvatarUrl('mdonner'),
      }, {
        id: 'Emily Procter',
        type: 'person',
        name: 'Emily Procter',
        mentionName: 'Calleigh Duquesne',
        avatarUrl: getPersonAvatarUrl('cduqesne'),
      }, {
        id: 'Adam Rodriguez',
        type: 'person',
        name: 'Adam Rodriguez',
        mentionName: 'Delko',
        avatarUrl: getPersonAvatarUrl('delko'),
      }, {
        id: 'Khandi Alexander',
        type: 'person',
        name: 'Khandi Alexander',
        mentionName: 'Alexx Woods',
        avatarUrl: getPersonAvatarUrl('awoods'),
      }, {
        id: 'Rory Cochrane',
        type: 'person',
        name: 'Rory Cochrane',
        mentionName: 'Tim Speedle',
        avatarUrl: getPersonAvatarUrl('tspeedle'),
      }, {
        id: 'Rex Linn',
        type: 'person',
        name: 'Rex Linn',
        mentionName: 'Frank Tripp',
        avatarUrl: getPersonAvatarUrl('ftripp'),
      }, {
        id: 'Eva LaRue',
        type: 'person',
        name: 'Eva LaRue',
        mentionName: 'Natalia Boa Vista',
        avatarUrl: getPersonAvatarUrl('`nboavista`'),
      }, {
        id: 'Megalyn Echikunwoke',
        type: 'person',
        name: 'Megalyn Echikunwoke',
        mentionName: 'Tara Price',
        avatarUrl: getPersonAvatarUrl('tprice'),
      }, {
        id: 'Eddie Cibrian',
        type: 'person',
        name: 'Eddie Cibrian',
        mentionName: 'Jesse Cardoza',
        avatarUrl: getPersonAvatarUrl('jcardoza'),
      }, {
        id: 'Omar Benson Miller',
        type: 'person',
        name: 'Omar Benson Miller',
        mentionName: 'Walter Simmons',
        avatarUrl: getPersonAvatarUrl('wsimmons'),
      },
    ],
  },
];

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1;
}

function searchData(query) {
  const results = data.map(({ title, items }) => {
    const filteredItems = items.filter(
      item => contains(item.name, query)
    );
    return { title, items: filteredItems };
  });
  return results;
}

// a little fake store for holding the query after a component unmounts
const store = {};

const onClickAction = (item) => { action(`onResultClick: ${item.name}`)(item); };

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
    const QuickSearchComp = this.props.withKeyboardControls
      ? AkQuickSearchWithKeyboardControls
      : AkQuickSearch;
    return (
      <QuickSearchComp
        isLoading={this.state.isLoading}
        onSearchChange={({ target }) => { this.search(target.value); }}
        onSearchClear={() => { this.search(''); }}
        value={this.state.query}

        onResultClick={onClickAction}
        results={this.state.results}
      />
    );
  }
}
