/* eslint-disable  mocha/no-skipped-tests */
import React from 'react';
import { shallow, mount } from 'enzyme';

import Avatar, { SIZE, ICON_TYPE } from '../../src/components/Avatar';
import AvatarImage from '../../src/components/Image';
import Presence from '../../src/components/Presence';

import { getSize } from '../../src/styled/utils';
import { AVATAR_SIZES } from '../../src/styled/constants';

const [online, offline, busy] = ICON_TYPE.values;

const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const gimg = global.Image;

describe('Avatar', () => {
  beforeEach(() => {
    global.Image = class Image {};
  });
  afterEach(() => {
    global.Image = gimg;
  });
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper).not.toBe(undefined);
    expect(wrapper.find(AvatarImage).exists()).toBe(true);
  });

  describe('size property', () => {
    SIZE.values.forEach((size) => {
      describe(`when is set to ${size}`, () =>
        it('should have the correct dimensions', () => {
          const result = getSize({ size });
          expect(result).toBe(AVATAR_SIZES[size]);
        })
      );
    });
  });

  describe('name property', () => {
    it('should set the title of the internal span', () => {
      const name = 'John Smith';
      const wrapper = mount(<Avatar name={name} src={oneByOnePixel} />);
      expect(wrapper.find(AvatarImage).getDOMNode().title).toBe(name);
    });
  });

  describe('presence property', () => {
    it('should NOT be visible when omitted', () => {
      const wrapper = mount(<Avatar />);
      expect(wrapper.find(Presence).find('svg').length).toBe(0);
    });

    [online, busy, offline].forEach((presence) => {
      describe(`when presence is set to '${presence}'`, () => {
        let wrapper;
        beforeEach(() => (wrapper = mount(<Avatar presence={presence} />)));

        it('should be visible', () => {
          expect(wrapper.find(Presence).find('svg').length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('borderColor property', () => {
    it('should be relfected in the Presence component', () => {
      const borderColor = '#ff0000';
      const wrapper = mount(<Avatar presence="online" borderColor={borderColor} />);
      const presence = wrapper.find(Presence);
      expect(presence.length).toBeGreaterThan(0);
      expect(presence.prop('borderColor')).toBe(borderColor);
    });
  });

  describe('appearance property', () => {
    it('should default to circle avatar', () => {
      const wrapper = shallow(<Avatar />);
      expect(wrapper.prop('appearance')).toBe('circle');
    });

    it('should apply rounded corners for square avatar', () => {
      const wrapper = mount(<Avatar appearance="square" />);
      expect(wrapper.find(AvatarImage).prop('appearance')).toBe('square');
    });
  });

  describe('icon property', () => {
    it('should render the icon', () => {
      const MyIcon = <div className="my-icon" />;
      const wrapper = mount(<Avatar icon={MyIcon} />);
      expect(wrapper.find('.my-icon')).toHaveLength(1);
    });

    it('should pass presence to Presence', () => {
      const wrapper = mount(<Avatar presence={online} />);
      const presence = wrapper.find(Presence);
      expect(presence.exists()).toBe(true);
      expect(presence.prop('presence')).toBe(online);
    });

    it('should pass icon props to Presence', () => {
      const MyIcon = <div className="my-icon" />;
      const wrapper = mount(<Avatar icon={MyIcon} />);
      const presence = wrapper.find(Presence);

      expect(presence.exists()).toBe(true);
      expect(presence.find('.my-icon')).toHaveLength(1);
    });
  });
});
