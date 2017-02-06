import React from 'react';
import { shallow } from 'enzyme';

import RecentContainers from '../src/components/RecentContainers';
import { name } from '../package.json';

describe(name, () => {
  it('should return null if there are no containers provided', () => {
    const wrapper = shallow(<RecentContainers containers={[]} />);

    expect(wrapper.type()).to.equal(null);
  });

  it('should render the icon with the correct url', () => {
    const containers = [
      {
        name: 'Recent container',
        url: 'url',
        iconUrl: 'iconurl',
        type: 'type',
      },
    ];

    const wrapper = shallow(<RecentContainers containers={containers} />);

    expect(wrapper.find('img').first().props().src).to.equal('iconurl');
  });
});
