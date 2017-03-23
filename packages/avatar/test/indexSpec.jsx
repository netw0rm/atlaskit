import React from 'react';
import { shallow, mount } from 'enzyme';
import styles from '../src/styles.less';

import Avatar from '../src';
import Image from '../src/Image';
import Presence from '../src/Presence';
import sizes from '../src/internal/sizes';
import presences from '../src/internal/presences';

const [none, online, offline, busy] = presences;

const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const oneByOnePixelBlack = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

describe('ak-avatar', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper).not.to.equal(undefined);
    expect(wrapper.find(Image)).to.have.lengthOf(1);
    expect(wrapper.find(Presence)).to.have.lengthOf(1);
  });

  describe('size property', () => {
    sizes.forEach((size) => {
      describe(`when is set to ${size}`, () =>
        it(`should have class ${size}`, () => {
          const wrapper = shallow(<Avatar size={size} />);
          expect(wrapper.find(`.${styles.locals[size]}`)).to.have.lengthOf(1);
        })
      );
    });
  });

  describe('label property', () => {
    const label = 'This is an avatar!';
    let wrapper;
    beforeEach(() => (wrapper = mount(<Avatar label={label} />)));

    it('should set an aria-label on the imgWrapper', () => {
      expect(wrapper.find(`.${styles.locals.imgWrapper}`).is(`[aria-label="${label}"]`))
        .to.equal(true);
    });

    it('should set the alt of the internal img', () => {
      wrapper.setProps({ src: oneByOnePixel });
      expect(wrapper.find(Image).prop('alt')).to.equal(label);
      expect(wrapper.find(Image).find('img').is(`[alt="${label}"]`)).to.equal(true);
    });
  });

  describe('presence property', () => {
    it('should not be visible when set to "none"', () => {
      const wrapper = mount(<Avatar presence={none} />);
      expect(wrapper.find(`.${styles.locals.presenceWrapper}`).hasClass(styles.locals.hidden)).to.equal(true);
      expect(wrapper.find(Presence).find('svg').length).to.equal(0);
    });

    [online, busy, offline].forEach((presence) => {
      describe(`when presence is set to '${presence}'`, () => {
        let wrapper;
        beforeEach(() => (wrapper = mount(<Avatar presence={presence} />)));

        it('should be visible', () => {
          expect(wrapper.find(`.${styles.locals.presenceWrapper}`).hasClass(styles.locals.hidden))
            .to.equal(false);
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

    it('should not render an img tag when src is not set', () => {
      wrapper = mount(<Avatar />);
      expect(wrapper.find(Image).find('img').length).to.equal(0);
    });
  });

  describe('type property', () => {
    it('should default to object avatar type without rounded corners', () => {
      const wrapper = mount(<Avatar />);
      expect(wrapper.prop('type')).to.equal('object');
      expect(wrapper.find(`.${styles.locals.objectAvatar}`)).to.have.lengthOf(1);
      expect(wrapper.find(`.${styles.locals.containerAvatar}`)).to.have.lengthOf(0);
    });

    it('should apply rounded corners for container avatar type', () => {
      const wrapper = mount(<Avatar type="container" />);
      expect(wrapper.find(`.${styles.locals.containerAvatar}`)).to.have.lengthOf(1);
      expect(wrapper.find(`.${styles.locals.objectAvatar}`)).to.have.lengthOf(0);
    });
  });

  describe('loading behaviour', () => {
    it('should not apply the .loaded class when loading', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ isLoading: true });
      expect(wrapper.find(`.${styles.locals.imgWrapper}`).hasClass(styles.locals.loaded))
        .to.equal(false);
    });

    it('should apply the .loaded class when not loading', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ isLoading: false });
      expect(wrapper.find(`.${styles.locals.imgWrapper}`).hasClass(styles.locals.loaded)).to.equal(true);
    });
  });
});
