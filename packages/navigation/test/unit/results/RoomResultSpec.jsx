import React from 'react';
import { AtlassianContainerResult, RoomResult } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Room Result', () => {
  let resultWrapper;
  beforeEach(() => {
    resultWrapper = mountWithRootTheme(<RoomResult resultId="testRoom" type="room" name="test" />);
  });

  it('should contain an AtlassianContainerResult', () => {
    expect(resultWrapper.find(AtlassianContainerResult).exists()).toBe(true);
  });

  it('should render the `topic` prop', () => {
    const topic = 'Food alerts topic';
    resultWrapper.setProps({ topic });
    expect(resultWrapper.text()).toEqual(expect.stringContaining(topic));
  });
});
