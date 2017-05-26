import React, { PureComponent } from 'react';
import { AtlassianIcon, CrossIcon, DashboardIcon } from '@atlaskit/icon';
import { AkSearch, AkNavigationItem } from '../../src/index';
import Spinner from '@atlaskit/spinner';

const data = [
  {
    group: 'Fictional swords',
    items: [
      'Caledfwlch',
      'Derfel Cadarn',
      'Dyrnwyn',
      'Smee\'s',
      'The Sword of Leah',
      'The Sword of Shannara',
      'Dragnipur',
      'Chance',
      'Vengeance',
      'The Swords of Blood and Fire',
      'Snaga',
      'Druss’',
      'Richard Rahl',
      'Callandor',
      'sa\'angreal',
      'Heron Mark Sword',
      'Graywand',
      'Scalpel',
      'The White Witch',
      'Valyrian steel',
      'Yyrkoon',
      'Elric',
      'Mask',
      'Icingdeath',
      'Twinkle',
      'Negima',
      'Goron',
      'Sarevok',
      'The Green Destiny',
      'Harun Al-Rashid',
      'Takezo Kensei',
      'Red Ranger',
      'Green Ranger',
      'Lord Zedd',
      'Power Rangers: Zeo',
      'Magna Defender',
      'Galaxy Rangers',
      'Dino Thunder',
      'Caliburn',
      'Sword of Damocles',
    ],
  },
  {
    group: 'CSI actors',
    items: [
      'David Caruso',
      'Kim Delaney',
      'Emily Procter',
      'Adam Rodriguez',
      'Khandi Alexander',
      'Rory Cochrane',
      'Rex Linn',
      'Eva LaRue',
      'Megalyn Echikunwoke',
      'Eddie Cibrian',
      'Omar Benson Miller',
    ],
  },
];

const icons = {
  'CSI actors': (<AtlassianIcon label="CSI" />),
  'Fictional swords': (<DashboardIcon label="Fictional swords" />),
};

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1;
}

function search(query) {
  const results = data.map(
    ({ group, items }) => (items
      .filter(item => contains(item, query) || contains(group, query))
      .map(item => ({
        group,
        item,
      }))
    )
  ).reduce((a, b) => a.concat(b));
  return results.map(({ item, group }, idx) => (
    <AkNavigationItem href="#foo" icon={icons[group]} subText={group} text={item} key={idx} />
  ));
}

// a little fake store for holding the query after a component unmounts
const store = {};

export default class BasicSearch extends PureComponent {
  static defaultProps = {
    searchDelay: 0,
  }

  state = {
    query: store.query || '',
    searchResults: search(''),
    isSearching: false,
  }

  setQuery(query) {
    store.query = query;
    this.setState({
      query,
    });
  }

  search = (query) => {
    clearTimeout(this.searchTimeoutId);
    this.setState({ isSearching: true });
    this.searchTimeoutId = setTimeout(() => {
      const searchResults = search(query);
      this.setState({
        isSearching: false,
        searchResults,
      });
    }, this.props.searchDelay);
  }

  render() {
    return (
      <AkSearch
        clearIcon={<CrossIcon label="clear" size="medium" />}
        onChange={({ target }) => { this.setQuery(target.value); this.search(target.value); }}
        onSearchClear={() => { this.setQuery(''); this.search(''); }}
        value={this.state.query}
        busyIcon={<Spinner />}
        isBusy={this.state.isSearching}
      >
        {this.state.searchResults}
      </AkSearch>
    );
  }
}
