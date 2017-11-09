import * as React from 'react';
import { shallow } from 'enzyme';
import { AppCardAction } from '../../../../src/app/model';
import { ActionsView } from '../../../../src/app/components/ActionsView';
import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';
import { ActionsMenu } from '../../../../src/app/styled/ActionsView';

describe('ActionsView', () => {

  it('should render no button and no menu items when there are zero actions', () => {
    const actions: AppCardAction[] = [];
    const element = shallow(<ActionsView actions={actions} isInversed={false} />);
    expect(element.find(Button)).toHaveLength(0);
    expect(element.find(ActionsMenu)).toHaveLength(0);
  });

  it('should render a button and zero menu items when there is one action', () => {
    const actions: AppCardAction[] = [{
      title: 'Open',
      target: {
        receiver: 'some.receiver',
        key: 'test.target'
      },
      parameters: {
        expenseId: 'some-id'
      }
    }];
    const element = shallow(<ActionsView actions={actions} isInversed={false} />);
    expect(element.find(Button)).toHaveLength(1);
    expect(element.find(ActionsMenu)).toHaveLength(0);
  });

  it('should render a button and two menu items when there are more than one actions', () => {
    const actions: AppCardAction[] = [
      {
        title: 'Open',
        target: {
          receiver: 'some.receiver1',
          key: 'test.target.open'
        },
        parameters: {
          expenseId: 'some-id1'
        }
      },
      {
        title: 'View',
        target: {
          receiver: 'some.receiver2',
          key: 'test.target.view'
        },
        parameters: {
          expenseId: 'some-id2'
        }
      },
      {
        title: 'Reply',
        target: {
          receiver: 'some.receiver3',
          key: 'test.target.reply'
        },
        parameters: {
          expenseId: 'some-id3'
        }
      }
    ];
    const element = shallow(<ActionsView actions={actions} isInversed={false} />);
    expect(element.find(Button)).toHaveLength(2);
    expect(element.find(DropdownMenu)).toHaveLength(1);
    const groups: Array<any> = element.find(DropdownMenu).prop('items');
    expect(groups).toHaveLength(1);
    expect(groups[0].items).toHaveLength(2);
    expect(groups[0].items[0]).toHaveProperty('content', 'View');
    expect(groups[0].items[1]).toHaveProperty('content', 'Reply');
  });

});
