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
    expect(wrapper).not.to.equal(undefined);
    expect(wrapper.find(Image).exists()).to.equal(true);
  });

  describe('size property', () => {
    SIZE.values.forEach((size) => {
      describe(`when is set to ${size}`, () =>
        it('should have the correct dimensions', () => {
          const result = getSize({ size });
          expect(result).to.equal(AVATAR_SIZES[size]);
        })
      );
    });
  });

  describe('label property', () => {
    const label = 'This is an avatar!';
    let wrapper;
    beforeEach(() => (wrapper = mount(<Avatar label={label} />)));

    it('should set an aria-label on the ImageWrapper', () => {
      expect(wrapper.find(ImageWrapper).prop('aria-label')).to.equal(label);
    });

    it('should set the alt of the internal img', () => {
      wrapper.setProps({ src: oneByOnePixel });
      wrapper.setState({ isLoading: false });
      expect(wrapper.find(Image).getDOMNode().alt).to.equal(label);
    });
  });

  describe('presence property', () => {
    it('should NOT be visible when set to "none"', () => {
      const wrapper = mount(<Avatar presence={none} />);
      expect(wrapper.find(Presence).find('svg').length).to.equal(0);
    });

    [online, busy, offline].forEach((presence) => {
      describe(`when presence is set to '${presence}'`, () => {
        let wrapper;
        beforeEach(() => (wrapper = mount(<Avatar presence={presence} />)));

        it('should be visible', () => {
          expect(wrapper.find(Presence).find('svg').length).to.be.above(0);
        });
      });
    });
  });

  describe('presenceBorderColor property', () => {
    it('should be relfected in the Presence component', () => {
      const wrapper = shallow(<Avatar presence="online" presenceBorderColor="#ff0000" />);
      const presence = wrapper.find(Presence);
      expect(presence).to.have.length.above(0);
      expect(presence.prop('borderColor')).to.equal('#ff0000');
    });
  });

  describe('src property', () => {
    let wrapper;
    beforeEach(() => (wrapper = mount(<Avatar src={oneByOnePixel} />)));

    it('should set the src property on the internal img', () => {
      expect(wrapper.find(Image).prop('src')).to.equal(oneByOnePixel);
      expect(wrapper.find(Image).find('img').is(`[src="${oneByOnePixel}"]`)).to.equal(true);
    });

    it('should render an img tag when src is set', () =>
      expect(wrapper.find(Image).find('img').length).to.be.above(0)
    );

    it('should set isLoading=false when a same src is provided', () => {
      wrapper.setProps({ src: oneByOnePixel });
      expect((wrapper).state('isLoading')).to.equal(false);
      expect((wrapper).state('hasError')).to.equal(false);
    });

    it('should set isLoading=true when a new src is provided', () => {
      wrapper.setProps({ src: oneByOnePixelBlack });
      expect((wrapper).state('isLoading')).to.equal(true);
      expect((wrapper).state('hasError')).to.equal(false);
    });

    it('should set isLoading=false & hasError=false when src is loaded without errors', () => {
      wrapper.find(Image).find('img').simulate('load');
      expect((wrapper).state('isLoading')).to.equal(false);
      expect((wrapper).state('hasError')).to.equal(false);
    });

    it('should set isLoading=false & hasError=true when a new invalid src is provided', () => {
      wrapper.find(Image).find('img').simulate('error');
      expect((wrapper).state('isLoading')).to.equal(false);
      expect((wrapper).state('hasError')).to.equal(true);
    });

    it('should NOT render an img tag when src is NOT set', () => {
      wrapper = mount(<Avatar />);
      expect(wrapper.find(Image).find('img').length).to.equal(0);
    });
  });

  describe('appearance property', () => {
    it('should default to circle avatar', () => {
      const wrapper = mount(<Avatar />);
      expect(wrapper.prop('appearance')).to.equal('circle');
      expect(wrapper.find(`.${styles.locals.circleAvatar}`)).to.have.lengthOf(1);
      expect(wrapper.find(`.${styles.locals.squareAvatar}`)).to.have.lengthOf(0);
    });

    it('should apply rounded corners for square avatar', () => {
      const wrapper = mount(<Avatar appearance="square" />);
      expect(wrapper.find(`.${styles.locals.squareAvatar}`)).to.have.lengthOf(1);
      expect(wrapper.find(`.${styles.locals.circleAvatar}`)).to.have.lengthOf(0);
    });
  });

  describe('icon property', () => {
    it('should render the icon', () => {
      const MyIcon = <div className="my-icon" />;
      const wrapper = mount(<Avatar icon={MyIcon} />);
      expect(wrapper.find('.my-icon')).to.have.lengthOf(1);
    });

    it('should pass icon and presence props to Presence', () => {
      const MyIcon = <div className="my-icon" />;
      const wrapper = mount(<Avatar presence={online} icon={MyIcon} />);
      const presence = wrapper.find(Presence);
      expect(presence).to.have.length.of(1);
      expect(presence.find('.my-icon')).to.have.lengthOf(1);
      expect(presence.props().presence).to.equal(online);
    });
  });

  describe('loading behaviour', () => {
    it('should apply the isLoading prop to the ImageWrapper when matching state on parent', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ isLoading: true });
      expect(wrapper.find(ImageWrapper).prop('isLoading')).to.equal(true);
    });

    it('should NOT apply the isLoading prop to the ImageWrapper when matching state on parent', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ isLoading: false });
      expect(wrapper.find(ImageWrapper).prop('isLoading')).to.equal(false);
    });
  });
});
