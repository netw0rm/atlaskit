import React from 'react';
import Avatar from '@atlaskit/avatar';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { RoomResult } from '../../src/components/js/results';
import { mountWithRootTheme } from '../theme-util';

describe('Room Result', () => {
  it('should render an avatar if avatarUrl is provided', () => {
    expect(mountWithRootTheme(<RoomResult avatarUrl="not null" />)
      .find(Avatar)).to.have.length(1);
  });

  it('should render an avatar if avatarUrl is not provided', () => {
    expect(mountWithRootTheme(<RoomResult />)
      .find(Avatar)).to.have.length(1);
  });

  it('should render name prop', () => {
    const name = 'Food alerts';
    expect(mountWithRootTheme(<RoomResult name={name} />)
      .text()).to.contain(name);
  });

  it('should render topic prop', () => {
    const name = 'Food alerts';
    expect(mountWithRootTheme(<RoomResult topic={name} />)
      .text()).to.contain(name);
  });

  it('should fill in topic with privacy name', () => {
    expect(mountWithRootTheme(<RoomResult privacy="private" />)
      .text()).to.contain('Private');
  });

  it('should prefer topic over privacy name', () => {
    const privacy = 'private';
    const topic = 'test-topic';
    const wrapper = mountWithRootTheme(<RoomResult topic={topic} privacy={privacy} />);
    expect(wrapper.text()).to.contain(topic);
    expect(wrapper.text()).to.not.contain(privacy);
  });

  it('should render privacy icons', () => {
    expect(mountWithRootTheme(<RoomResult privacy="private" />)
      .find(LockFilledIcon)).to.have.length(1);
    expect(mountWithRootTheme(<RoomResult privacy="public" />)
      .find(WorldIcon)).to.have.length(1);
  });
});
