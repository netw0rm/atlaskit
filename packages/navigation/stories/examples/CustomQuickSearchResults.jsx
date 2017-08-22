import React, { PureComponent } from 'react';
import AkAvatar from '@atlaskit/avatar';
import { AkQuickSearch, AkNavigationItemGroup, AkSearchDrawer, resultTypes } from '../../src';

const { ResultBase } = resultTypes;

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
        text={<h3>{messages[index]}</h3>}
        textAfter={avatar}
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class CustomResultFromInterface extends PureComponent {
  static mainStyles = {
    'align-items': 'center',
    'border-radius': '800px',
    display: 'flex',
    'font-size': '16px',
    margin: '8px',
  }
  handleMouseEnter = () => this.props.onMouseEnter({
    resultId: this.props.resultId,
  });
  render() {
    const { index, isSelected } = this.props;
    return (
      <button onMouseEnter={this.handleMouseEnter} style={CustomResultFromInterface.mainStyles}>
        <div style={{ 'margin-right': '8px' }}>
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

export default (
  <AkSearchDrawer isOpen>
    <AkQuickSearch placeholder="Sorry, no search callback in this story">
      <AkNavigationItemGroup title="Custom result type built on top of existing result type">
        {[0, 1, 2, 3].map(n => <CustomResultFromBase resultId={n} index={n} />)}
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="Custom result type built from scratch">
        {[4, 5, 6, 7].map(n => <CustomResultFromInterface resultId={n} index={n} />)}
      </AkNavigationItemGroup>
    </AkQuickSearch>
  </AkSearchDrawer>
);
