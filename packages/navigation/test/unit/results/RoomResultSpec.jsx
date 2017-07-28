import React from 'react';
import Avatar from '@atlaskit/avatar';
import { RoomResult } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Room Result', () => {
  let roomResult;
  beforeEach(() => {
    roomResult = mountWithRootTheme(<RoomResult resultId="testRoom" type="room" name="test" />);
  });

  it('should render an avatar if avatarUrl is provided', () => {
    roomResult.setProps({ avatarUrl: 'not null' });
    expect(roomResult.find(Avatar)).toHaveLength(1);
  });

  it('should render an avatar if avatarUrl is not provided', () => {
    expect(roomResult.find(Avatar)).toHaveLength(1);
  });

  it('should render name prop', () => {
    const name = 'Food alerts';
    roomResult.setProps({ name });
    expect(roomResult.text()).toEqual(expect.stringContaining(name));
  });

  it('should render topic prop', () => {
    const topic = 'Food alerts topic';
    roomResult.setProps({ topic });
    expect(roomResult.text()).toEqual(expect.stringContaining(topic));
  });

  it('should render lock icon on private room results', () => {
    roomResult.setProps({ privacy: 'private' });
    expect(roomResult.find(Avatar).at(0).prop('status')).toBe('locked');
  });

  it('should pass null status prop to Avatar on non-private room results', () => {
    // No privacy prop supplied
    expect(roomResult.find(Avatar).at(0).prop('status')).toBe(null);

    roomResult.setProps({ privacy: 'public' });
    expect(roomResult.find(Avatar).at(0).prop('status')).toBe(null);
  });
});
