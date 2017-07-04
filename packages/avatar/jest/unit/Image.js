import React from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '../../src/components/Avatar';
import AvatarImage, { DefaultImage } from '../../src/components/Image';

const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('Avatar', () =>
  describe('Image', () => {
    it('should render an img when the src is set"', () => {
      const wrapper = mount(<AvatarImage src={src} />);
      expect(wrapper.find('img').exists()).toBe(true);
    });
    it('should not render an img when the src is not set"', () =>
      expect(shallow(<AvatarImage />).find('img').exists()).toBe(false)
    );

    describe('default avatar', () => {
      describe('should render default avatar', () => {
        it('when no properties are provided', () =>
          expect(shallow(<AvatarImage />).find(DefaultImage).exists()).toBe(true)
        );

        it('when there is an error', () =>
          expect(shallow(<AvatarImage hasError />).find(DefaultImage).exists()).toBe(true)
        );

        it('when src is set and there is an error', () =>
          expect(shallow(<AvatarImage src={src} hasError />).find(DefaultImage).exists()).toBe(true)
        );
      });

      describe('should not render default avatar', () => {
        it('when loading=true and no src', () =>
          expect(shallow(<AvatarImage isLoading />).find(DefaultImage).exists()).toBe(false)
        );

        it('when src is set', () =>
          expect(shallow(<AvatarImage src={src} />).find(DefaultImage).exists()).toBe(false)
        );
      });
    });

    describe('src property', () => {
      describe('set at mount time', () => {
        let wrapper;
        beforeEach(() => (wrapper = mount(<Avatar src={src} />)));

        it('should set the src property on the internal img', () => {
          expect(wrapper.find(AvatarImage).prop('src')).to.equal(src);
          expect(wrapper.find(AvatarImage).find('img').is(`[src="${src}"]`)).to.equal(true);
        });

        it('should render an img tag when src is set', () =>
          expect(wrapper.find(AvatarImage).find('img').length).to.be.above(0)
        );

        it('should set isLoading=false when a same src is provided as the src already loaded', () => {
          expect((wrapper).state('isLoading')).to.equal(true);
          wrapper.find(AvatarImage).find('img').simulate('load');
          expect((wrapper).state('isLoading')).to.equal(false);
          wrapper.setProps({ src });
          expect((wrapper).state('isLoading')).to.equal(false);
          expect((wrapper).state('hasError')).to.equal(false);
        });

        it('should set isLoading=true when a new src is provided', () => {
          wrapper.setProps({ src });
          expect((wrapper).state('isLoading')).to.equal(true);
          expect((wrapper).state('hasError')).to.equal(false);
        });

        it('should set isLoading=false & hasError=false when src is loaded without errors', () => {
          wrapper.find(AvatarImage).find('img').simulate('load');
          expect((wrapper).state('isLoading')).to.equal(false);
          expect((wrapper).state('hasError')).to.equal(false);
        });

        it('should set isLoading=false & hasError=true when a new invalid src is provided', () => {
          wrapper.find(AvatarImage).find('img').simulate('error');
          expect((wrapper).state('isLoading')).to.equal(false);
          expect((wrapper).state('hasError')).to.equal(true);
        });

        it('should NOT render an img tag when src is NOT set', () => {
          wrapper = mount(<Avatar />);
          expect(wrapper.find(AvatarImage).find('img').length).to.equal(0);
        });
      });

      describe('set after mount time', () => {
        it('should load image successfully when src set', () => {
          const wrapper = mount(<Avatar />);
          expect((wrapper).state('isLoading')).to.equal(false);
          wrapper.setProps({ src });
          expect((wrapper).state('isLoading')).to.equal(true);
          wrapper.find(AvatarImage).find('img').simulate('load');
          expect((wrapper).state('isLoading')).to.equal(false);
        });
      });
    });
  })
);
