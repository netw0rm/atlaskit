import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';
import styles from '../src/styles.less';

import Avatar from '../src';
import Image from '../src/Image';
import Presence from '../src/Presence';

const { expect } = chai;
chai.use(chaiEnzyme());

const avatarSizes = ['small', 'medium', 'large', 'xlarge'];
const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('ak-avatar', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper).to.be.defined;
    expect(wrapper.find(Image)).to.have.lengthOf(1);
    expect(wrapper.find(Presence)).to.have.lengthOf(1);
  });

  describe('size property', () => {
    avatarSizes.forEach((size) => {
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
      expect(wrapper.find(`.${styles.locals.imgWrapper}`))
        .to.have.attr('aria-label', label);
    });

    it('should set the alt of the internal img', () => {
      wrapper.setProps({ src: oneByOnePixel });
      expect(wrapper.find(Image)).to.have.attr('alt', label);
    });
  });

  describe('presence property', () => {
    it('should not be visible when set to "none"', () => {
      const wrapper = mount(<Avatar presence="none" />);
      expect(wrapper.find(`.${styles.locals.presenceWrapper}`))
        .to.have.className(styles.locals.hidden);
      expect(wrapper.find(Presence)).to.not.have.descendants('svg');
    });

    ['online', 'busy', 'offline'].forEach((presence) => {
      describe(`when presence is set to '${presence}'`, () => {
        let wrapper;
        beforeEach(() => (wrapper = mount(<Avatar presence={presence} />)));

        it('should be visible', () => {
          expect(wrapper.find(`.${styles.locals.presenceWrapper}`))
            .to.not.have.className(styles.locals.hidden);
          expect(wrapper.find(Presence)).to.have.descendants('svg');
        });
      });
    });
  });

  describe('src property', () => {
    let wrapper;
    beforeEach(() => (wrapper = mount(<Avatar src={oneByOnePixel} />)));

    it('should set the src property on the internal img', () =>
      expect(wrapper.find(Image)).to.have.attr('src', oneByOnePixel)
    );

    it('should render an img tag when src is set', () =>
      expect(wrapper.find(Image)).to.have.descendants('img')
    );

    it('should not render an img tag when src is not set', () => {
      wrapper = mount(<Avatar />);
      expect(wrapper.find(Image)).to.not.have.descendants('img');
    });
  });

  describe('loading behaviour', () => {
    it('should not apply the .loaded class when loading', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ loading: true });
      expect(wrapper.find(`.${styles.locals.imgWrapper}`))
        .to.not.have.className(styles.locals.loaded);
    });

    it('should apply the .loaded class when not loading', () => {
      const wrapper = mount(<Avatar />);
      wrapper.setState({ loading: false });
      expect(wrapper.find(`.${styles.locals.imgWrapper}`))
        .to.have.className(styles.locals.loaded);
    });
  });
});
