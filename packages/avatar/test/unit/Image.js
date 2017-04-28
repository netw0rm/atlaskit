import React from 'react';
import { mount, shallow } from 'enzyme';
import Image, { DefaultImage } from '../../src/components/Image';

const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('Avatar', () =>
  describe('Image', () => {
    it('should render an img when the src is set"', () => {
      const wrapper = mount(<Image src={src} />);
      expect(wrapper.find('img').exists()).to.equal(true);
    });
    it('should not render an img when the src is not set"', () =>
      expect(shallow(<Image />).find('img').exists()).to.equal(false)
    );

    describe('default avatar', () => {
      describe('should render default avatar', () => {
        it('when no properties are provided', () =>
          expect(shallow(<Image />).find(DefaultImage).exists()).to.equal(true)
        );

        it('when there is an error', () =>
          expect(shallow(<Image hasError />).find(DefaultImage).exists()).to.equal(true)
        );

        it('when src is set and there is an error', () =>
          expect(shallow(<Image src={src} hasError />).find(DefaultImage).exists()).to.equal(true)
        );
      });

      describe('should not render default avatar', () => {
        it('when loading=true and no src', () =>
          expect(shallow(<Image isLoading />).find(DefaultImage).exists()).to.equal(false)
        );

        it('when src is set', () =>
          expect(shallow(<Image src={src} />).find(DefaultImage).exists()).to.equal(false)
        );
      });
    });
  })
);
