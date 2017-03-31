import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CardActionType } from '@atlaskit/media-core';

import { Menu } from '../../src/utils/menu/index';
import { MeatballsButton, DeleteBtn } from '../../src/utils/menu/styled';

describe('Menu', () => {
  it('should render the meatballs menu when supplied with multiple actions', () => {
    const menuActions = [
      {label: 'Open', handler: () => {}},
      {label: 'Close', handler: () => {}},
    ];

    const card = shallow(<Menu actions={menuActions}/>);
    expect(card.find(MeatballsButton)).to.have.length(1);
    expect(card.find(DeleteBtn)).to.have.length(0);
    card.unmount();
  });

  it('should render the meatballs menu when supplied with multiple actions including one with type "delete"', () => {
    const deleteAction = {type: CardActionType.delete, label: 'Delete', handler: () => {}};
    const menuActions = [
      {label: 'Open', handler: () => {}},
      {label: 'Close', handler: () => {}},
      deleteAction
    ];

    const card = shallow(<Menu actions={[deleteAction]}/>);
    expect(card.find(MeatballsButton)).to.have.length(0);
    expect(card.find(DeleteBtn)).to.have.length(1);
    card.unmount();
  });

  it('should render the delete button when supplied with a single action with type "delete"', () => {
    const deleteAction = {type: CardActionType.delete, label: 'Delete', handler: () => {}};

    const card = shallow(<Menu actions={[deleteAction]}/>);
    expect(card.find(MeatballsButton)).to.have.length(0);
    expect(card.find(DeleteBtn)).to.have.length(1);
    card.unmount();
  });
});
