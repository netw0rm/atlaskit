import React, { PureComponent } from 'react';
import AkAvatar from '@atlaskit/avatar';
import { AkQuickSearch, AkNavigationItemGroup, AkSearchDrawer, quickSearchResultTypes } from '../../src';
import SearchIcon from '@atlaskit/icon/glyph/search';

const { ResultBase } = quickSearchResultTypes;

const getPersonAvatarUrl = identity => `http://api.adorable.io/avatar/32/${identity}`;

const messages = [
  'Keyboard',
  'interactions',
  'still',
  'work',
  'even',
  'on',
  'these',
  'monstrosities',
];

class CustomResultFromBase extends PureComponent {
  render() {
    const { index, ...props } = this.props;
    const avatar = <AkAvatar appearance="square" size="small" src={getPersonAvatarUrl(index)} />;
    return (
      <ResultBase
        {...props}
        isCompact
        icon={avatar}
        text={messages[index]}
        textAfter={avatar}
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class CustomResultFromInterface extends PureComponent {
  static mainStyles = {
    alignItems: 'center',
    borderRadius: '800px',
    display: 'flex',
    fontSize: '16px',
    margin: '8px',
  }
  handleMouseEnter = () => this.props.onMouseEnter({
    resultId: this.props.resultId,
  });
  render() {
    const { index, isSelected } = this.props;
    return (
      <button onMouseEnter={this.handleMouseEnter} style={CustomResultFromInterface.mainStyles}>
        <div style={{ marginRight: '8px' }}>
          <AkAvatar
            src={getPersonAvatarUrl(index)}
            size={isSelected ? 'xlarge' : 'large'}
          />
        </div>
        {messages[index]}
      </button>
    );
  }
}

const searchIcon = <SearchIcon label="search" />;

export default (
  <AkSearchDrawer
    backIcon={searchIcon}
    isOpen
    onBackButton={() => {}}
    primaryIcon={searchIcon}
  >
    <AkQuickSearch onSearchInput={() => {}} placeholder="Sorry, no search callback in this story">
      <AkNavigationItemGroup title="Custom result type built on top of existing result type">
        {[0, 1, 2, 3].map(n => <CustomResultFromBase resultId={n} index={n} key={n} />)}
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="Custom result type built from scratch">
        {[4, 5, 6, 7].map(n => <CustomResultFromInterface resultId={n} index={n} key={n} />)}
      </AkNavigationItemGroup>
    </AkQuickSearch>
  </AkSearchDrawer>
);
