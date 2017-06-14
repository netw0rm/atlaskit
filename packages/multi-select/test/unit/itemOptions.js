import React from 'react';
import { mount } from 'enzyme';

import { name } from '../../package.json';
import { MultiSelectStateless } from '../../src';

describe(`${name} - shared functions`, () => {
  it('should render an array of items', () => {
    const items = [
      { content: 'test1', value: 'test1' },
      { content: 'test2', value: 'test2' },
    ];
    const wrapper = mount(<MultiSelectStateless items={items} />);
    expect(wrapper.state().groupedItems.length).to.equal(1);
    expect(wrapper.state().groupedItems[0].items).to.equal(items);
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

    const wrapper = mount(<MultiSelectStateless items={groups} />);
    expect(wrapper.state().groupedItems.length).to.equal(1);
    expect(wrapper.state().groupedItems[0]).to.equal(groups[0]);
  });
});
