/* eslint-disable  mocha/no-skipped-tests */
import React from 'react';
import { shallow, mount } from 'enzyme';

import Avatar, { SIZE, PRESENCE_TYPE } from '../../src/components/Avatar';
import Image from '../../src/components/Image';
import Presence from '../../src/components/Presence';

import { ImageWrapper, getSize } from '../../src/styled/Avatar';
import { AVATAR_SIZES } from '../../src/styled/constants';

const [none, online, offline, busy] = PRESENCE_TYPE.values;

const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const oneByOnePixelBlack = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

describe('Avatar', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper).not.toBe(undefined);
    expect(wrapper.find(Image).exists()).toBe(true);
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

  describe('label property', () => {
    const label = 'This is an avatar!';
    let wrapper;
    beforeEach(() => (wrapper = mount(<Avatar label={label} />)));

    it('should set an aria-label on the ImageWrapper', () => {
      expect(wrapper.find(ImageWrapper).prop('aria-label')).toBe(label);
    });

    it('should set the alt of the internal img', () => {
      wrapper.setProps({ src: oneByOnePixel });
      wrapper.setState({ isLoading: false });
      expect(wrapper.find(Image).getDOMNode().alt).toBe(label);
    });
  });

  describe('presence property', () => {
    it('should NOT be visible when set to "none"', () => {
      const wrapper = mount(<Avatar presence={none} />);
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

  describe('presenceBorderColor property', () => {
    it('should be relfected in the Presence component', () => {
      const wrapper = shallow(<Avatar presence="online" presenceBorderColor="#ff0000" />);
      const presence = wrapper.find(Presence);
      expect(presence.length).toBeGreaterThan(0);
      expect(presence.prop('borderColor')).toBe('#ff0000');
    });
  });

  describe('src property', () => {
    describe('set at mount time', () => {
      let wrapper;
      beforeEach(() => (wrapper = mount(<Avatar src={oneByOnePixel} />)));

      it('should set the src property on the internal img', () => {
        expect(wrapper.find(Image).prop('src')).toBe(oneByOnePixel);
        expect(wrapper.find(Image).find('img').is(`[src="${oneByOnePixel}"]`)).toBe(true);
      });

      it('should render an img tag when src is set', () =>
        expect(wrapper.find(Image).find('img').length).toBeGreaterThan(0)
      );

      it('should set isLoading=false when a same src is provided as the src already loaded', () => {
        expect((wrapper).state('isLoading')).toBe(true);
        wrapper.find(Image).find('img').simulate('load');
        expect((wrapper).state('isLoading')).toBe(false);
        wrapper.setProps({ src: oneByOnePixel });
        expect((wrapper).state('isLoading')).toBe(false);
        expect((wrapper).state('hasError')).toBe(false);
      });

      it('should set isLoading=true when a new src is provided', () => {
        wrapper.setProps({ src: oneByOnePixelBlack });
        expect((wrapper).state('isLoading')).toBe(true);
        expect((wrapper).state('hasError')).toBe(false);
      });

      it('should set isLoading=false & hasError=false when src is loaded without errors', () => {
        wrapper.find(Image).find('img').simulate('load');
        expect((wrapper).state('isLoading')).toBe(false);
        expect((wrapper).state('hasError')).toBe(false);
      });

      it('should set isLoading=false & hasError=true when a new invalid src is provided', () => {
        wrapper.find(Image).find('img').simulate('error');
        expect((wrapper).state('isLoading')).toBe(false);
        expect((wrapper).state('hasError')).toBe(true);
      });

      it('should NOT render an img tag when src is NOT set', () => {
        wrapper = mount(<Avatar />);
        expect(wrapper.find(Image).find('img').length).toBe(0);
      });
    });

    describe('set after mount time', () => {
      it('should load image successfully when src set', () => {
        const wrapper = mount(<Avatar />);
        expect((wrapper).state('isLoading')).toBe(false);
        wrapper.setProps({ src: oneByOnePixel });
        expect((wrapper).state('isLoading')).toBe(true);
        wrapper.find(Image).find('img').simulate('load');
        expect((wrapper).state('isLoading')).toBe(false);
      });

      it('should not load if new src is empty', () => {
        const wrapper = mount(<Avatar />);
        expect((wrapper).state('isLoading')).toBe(false);
        wrapper.setProps({ src: null });
        expect((wrapper).state('isLoading')).toBe(false);
      });
    });
  });

  describe('appearance property', () => {
    it('should default to circle avatar', () => {
      const wrapper = mount(<Avatar />);
      expect(wrapper.prop('appearance')).toBe('circle');
    });

    it('should apply rounded corners for square avatar', () => {
      const wrapper = mount(<Avatar appearance="square" />);
      expect(wrapper.find(ImageWrapper).prop('appearance')).toBe('square');
    });
  });

  describe('icon property', () => {
    it('should render the icon', () => {
      const MyIcon = <div className="my-icon" />;
      const wrapper = mount(<Avatar icon={MyIcon} />);
      expect(wrapper.find('.my-icon')).toHaveLength(1);
    });

    it('should pass icon and presence props to Presence', () => {
      const MyIcon = <div className="my-icon" />;
      const wrapper = mount(<Avatar presence={online} icon={MyIcon} />);
      const presence = wrapper.find(Presence);
      expect(presence).toHaveLength(1);
      expect(presence.find('.my-icon')).toHaveLength(1);
      expect(presence.props().presence).toBe(online);
    });
  });

  describe('loading behaviour', () => {
    it('should apply the isLoading prop to the ImageWrapper when matching state on parent', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ isLoading: true });
      expect(wrapper.find(ImageWrapper).prop('isLoading')).toBe(true);
    });

    it('should NOT apply the isLoading prop to the ImageWrapper when matching state on parent', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ isLoading: false });
      expect(wrapper.find(ImageWrapper).prop('isLoading')).toBe(false);
    });
  });
});
