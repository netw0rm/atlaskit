import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {Action} from '../../../src/app/model';
import {ActionsView} from '../../../src/app/components/ActionsView';
import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';
import {ActionsMenu} from '../../../src/app/styled/ActionsView';

describe('ActionsView', () => {

  it('should render no button and no menu items when there are zero actions', () => {
    const actions: Action[] = [];
    const element = shallow(<ActionsView actions={actions} inverse={false}/>);
    expect(element.find(Button)).to.have.length(0);
    expect(element.find(ActionsMenu)).to.have.length(0);
  });

  it('should render a button and zero menu items when there is one action', () => {
    const actions: Action[] = [{title: 'Open', handler: () => {/* do nothing */}}];
    const element = shallow(<ActionsView actions={actions} inverse={false}/>);
    expect(element.find(Button)).to.have.length(1);
    expect(element.find(ActionsMenu)).to.have.length(0);
  });

  it('should render a button and two menu items when there are more than one actions', () => {
    const actions: Action[] = [
      {title: 'Open', handler: () => {/* do nothing */}},
      {title: 'View', handler: () => {/* do nothing */}},
      {title: 'Reply', handler: () => {/* do nothing */}}
    ];
    const element = shallow(<ActionsView actions={actions} inverse={false}/>);
    expect(element.find(Button)).to.have.length(1);
    expect(element.find(DropdownMenu)).to.have.length(1);
    expect(element.find(ActionsMenu).prop('items')).to.have.length(2);
  });

});
