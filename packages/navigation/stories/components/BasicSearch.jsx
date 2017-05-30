import React, { PureComponent } from 'react';
import { AtlassianIcon, CrossIcon, DashboardIcon } from '@atlaskit/icon';
import { AkSearch, AkNavigationItem } from '../../src/index';

const data = [
  {
    group: 'Fictional swords',
    items: [
      { name: 'Caledfwlch' },
      { name: 'Derfel Cadarn' },
      { name: 'Dyrnwyn' },
      { name: 'Smee\'s' },
      { name: 'The Sword of Leah' },
      { name: 'The Sword of Shannara' },
      { name: 'Dragnipur' },
      { name: 'Chance' },
      { name: 'Vengeance' },
      { name: 'The Swords of Blood and Fire' },
      { name: 'Snaga' },
      { name: 'Druss’' },
      {
        name: 'Richard Rahl',
        caption: 'The Sword of Truth',
      },
      { name: 'Callandor' },
      { name: 'sa\'angreal', caption: 'The Wheel of Time' },
      { name: 'Heron Mark Sword', caption: 'The Wheel of Time' },
      { name: 'Graywand' },
      { name: 'Scalpel' },
      { name: 'The White Witch' },
      { name: 'Valyrian steel', caption: 'A Song of Ice and Fire' },
      { name: 'Yyrkoon' },
      { name: 'Elric' },
      { name: 'Mask' },
      { name: 'Icingdeath' },
      { name: 'Twinkle' },
      { name: 'Negima' },
      { name: 'Goron' },
      { name: 'Sarevok' },
      { name: 'The Green Destiny' },
      { name: 'Harun Al-Rashid' },
      { name: 'Takezo Kensei', caption: 'Heroes' },
      { name: 'Red Ranger', caption: 'Power Rangers' },
      { name: 'Green Ranger', caption: 'Power Rangers' },
      { name: 'Lord Zedd', caption: 'Power Rangers' },
      { name: 'Power Rangers: Zeo', caption: 'Power Rangers' },
      { name: 'Magna Defender' },
      { name: 'Galaxy Rangers' },
      { name: 'Dino Thunder' },
      { name: 'Caliburn' },
      { name: 'Sword of Damocles' },
    ],
  },
  {
    group: 'CSI actors',
    items: [
      { name: 'David Caruso', caption: 'Horatio Caine' },
      { name: 'Kim Delaney', caption: 'Megan Donner' },
      { name: 'Emily Procter', caption: 'Calleigh Duquesne' },
      { name: 'Adam Rodriguez', caption: 'Delko' },
      { name: 'Khandi Alexander', caption: 'Alexx Woods' },
      { name: 'Rory Cochrane', caption: 'Tim Speedle' },
      { name: 'Rex Linn', caption: 'Frank Tripp' },
      { name: 'Eva LaRue', caption: 'Natalia Boa Vista' },
      { name: 'Megalyn Echikunwoke', caption: 'Tara Price' },
      { name: 'Eddie Cibrian', caption: 'Jesse Cardoza' },
      { name: 'Omar Benson Miller', caption: 'Walter Simmons' },
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
      .filter(item => contains(item.name, query) || contains(group, query))
      .map(item => ({
        group,
        item,
      }))
    )
  ).reduce((a, b) => a.concat(b));
  return results.map(({ item, group }, idx) => (
    <AkNavigationItem href="#foo" icon={icons[group]} subText={group} text={item.name} caption={item.caption} key={idx} />
  ));
}

// a little fake store for holding the query after a component unmounts
const store = {};

export default class BasicSearch extends PureComponent {
  state = {
    query: store.query || '',
  }

  setQuery(query) {
    store.query = query;
    this.setState({
      query,
    });
  }

  render() {
    return (
      <AkSearch
        clearIcon={<CrossIcon label="clear" size="medium" />}
        onChange={({ target }) => { this.setQuery(target.value); }}
        onSearchClear={() => { this.setQuery(''); }}
        value={this.state.query}
      >
        {search(this.state.query)}
      </AkSearch>
    );
  }
}
