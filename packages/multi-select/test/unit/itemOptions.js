import React from 'react';
import { shallow } from 'enzyme';

import { name } from '../../package.json';
import { MultiSelectStateless } from '../../src';

describe(`${name} - shared functions`, () => {
  it('should render an array of items', () => {
    const items = [
      { content: 'test1', value: 'test1' },
      { content: 'test2', value: 'test2' },
    ];
    const wrapper = shallow(<MultiSelectStateless items={items} />);
    expect(wrapper.state().groupedItems.length).toBe(1);
    expect(wrapper.state().groupedItems[0].items).toBe(items);
  });
  it('should render an array of groups', () => {
    const groups = [
      {
        items: [
          { content: 'test1', value: 'test1' },
          { content: 'test2', value: 'test2' },
        ],
      },
    ];

    const wrapper = shallow(<MultiSelectStateless items={groups} />);
    expect(wrapper.state().groupedItems.length).toBe(1);
    expect(wrapper.state().groupedItems[0]).toBe(groups[0]);
  });
});
