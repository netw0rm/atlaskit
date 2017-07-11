import React from 'react';
import { AkNavigationItemGroup, AkSearchResults } from '../../src';
import { PersonResult, RoomResult } from '../../src/components/js/results';
import { mountWithRootTheme } from './_theme-util';

const testData =
  [
    {
      title: 'Obi Wan\'s Conversations',
      items: [
        {
          id: '1',
          type: 'person',
          presenceMessage: 'On-call',
          presenceState: 'offline',
          name: 'Qui-Gon Jinn',
          mentionName: 'MasterQ',
        },
        {
          id: '2',
          type: 'person',
          name: 'Luke Skywalker',
          mentionName: 'lskywalker',
          presenceState: 'online',
        },
        {
          id: '3',
          type: 'room',
          name: 'Jedi Council [archived]',
          privacy: 'private',
        },
        {
          id: '4',
          type: 'room',
          name: 'Jawa Movie Night',
        },
      ],
    },
  ];

const testDataTwoGroups =
  [
    {
      title: 'Group A',
      items: [
        {
          id: '1',
          type: 'person',
          name: 'Qui-Gon Jinn',
        },
        {
          id: '2',
          type: 'person',
          name: 'Luke Skywalker',
        },
      ],
    },
    {
      title: 'Group B',
      items: [
        {
          id: '3',
          type: 'room',
          name: 'Room A',
        },
        {
          id: '4',
          type: 'room',
          name: 'Room B',
        },
      ],
    },
    {
      title: 'Group C',
      items: [],
    },
    {
      title: 'Group D',
    },
  ];

describe('Search Results', () => {
  it('should render a result group\'s title and items', () => {
    const wrapper = mountWithRootTheme(<AkSearchResults results={testData} />);
    expect(wrapper.find(PersonResult)).toHaveLength(2);
    expect(wrapper.find(RoomResult)).toHaveLength(2);
    expect(wrapper.text()).toEqual(expect.stringContaining('Obi Wan\'s Conversations'));
  });

  it('should render each group separately', () => {
    expect(mountWithRootTheme(<AkSearchResults results={testDataTwoGroups} />)
      .find(AkNavigationItemGroup)).toHaveLength(2);
  });

  it('should not render groups with no items', () => {
    const wrapper = mountWithRootTheme(<AkSearchResults results={testDataTwoGroups} />);
    expect(wrapper.text()).toEqual(expect.stringContaining('Group A'));
    expect(wrapper.text()).toEqual(expect.stringContaining('Group B'));
    expect(wrapper.text()).not.toEqual(expect.stringContaining('Group C'));
    expect(wrapper.text()).not.toEqual(expect.stringContaining('Group D'));
  });
});
