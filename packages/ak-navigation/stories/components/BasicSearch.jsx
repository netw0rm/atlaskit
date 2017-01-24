import React, { PureComponent } from 'react';
import { AtlassianIcon, CancelIcon, DashboardIcon } from 'ak-icon';
import { AkSearch, AkContainerItem } from '../../src/index';

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
  return results.map(({ item, group }) => (
    <AkContainerItem href="#foo" icon={icons[group]} subText={group} text={item} />
  ));
}

export default class DemoSearch extends PureComponent {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }
  render() {
    return (
      <AkSearch
        clearIcon={<CancelIcon size="medium" />}
        onChange={({ target }) => { this.setState({ query: target.value }); }}
        onSearchClear={() => { this.setState({ query: '' }); }}
        value={this.state.query}
      >
        {search(this.state.query)}
      </AkSearch>
    );
  }
}
