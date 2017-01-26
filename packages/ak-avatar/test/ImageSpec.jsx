import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import DefaultAvatar from '../src/internal/default-avatar';
import Image from '../src/Image';

const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('ak-avatar', () =>
  describe('Image', () => {
    it('should render an img when the src is set"', () => {
      const wrapper = shallow(<Image src={src} />);
      expect(wrapper.find('img').length).to.equal(1);
    });
    it('should not render an img when the src is not set"', () =>
      expect(shallow(<Image />)).to.not.have.descendants('img')
    );

    describe('default avatar', () => {
      describe('should render default avatar', () => {
        it('when no properties are provided', () =>
          expect(shallow(<Image />).find(DefaultAvatar).length).to.equal(1)
        );

        it('when there is an error', () =>
          expect(shallow(<Image hasError />).find(DefaultAvatar).length).to.equal(1)
        );

        it('when src is set and there is an error', () =>
          expect(shallow(<Image src={src} hasError />).find(DefaultAvatar).length).to.equal(1)
        );
      });

      describe('should not render default avatar', () => {
        it('when loading=true and no src', () =>
          expect(shallow(<Image isLoading />)).to.not.have.descendants(DefaultAvatar)
        );

        it('when src is set', () =>
          expect(shallow(<Image src={src} />)).to.not.have.descendants(DefaultAvatar)
        );
      });
    });
  })
);
