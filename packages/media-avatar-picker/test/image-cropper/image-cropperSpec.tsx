import * as React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import {StatelessImageCropper, Container} from '../../src/image-cropper/Stateless';

const imageSource = 'imageUrl';
const imageWidth = 500;
const top = 10;
const left = 20;
const containerSize = 400;

describe('Image cropper', () => {
  let component;

  beforeEach(() => {
    component = mount(<StatelessImageCropper
      imageSource={imageSource}
      imageWidth={imageWidth}
      containerSize={containerSize}
      top={top}
      left={left}
    />);
  });

  describe('image tag', () => {
    let img;

    beforeEach(() => {
      img = component.find('img');
    });

    it('should have defined source', () => {
      expect(img.props().src).to.equal(imageSource);
    });

    it('should have defined position', () => {
      expect(img.props().style.top).to.equal(`${top}px`);
      expect(img.props().style.left).to.equal(`${left}px`);
    });

    it('should have defined size', () => {
      expect(img.props().style.width).to.equal(`${imageWidth}px`);
    });
  });

  describe('container', () => {
    let container;

    beforeEach(() => {
      container = component.find(Container);
    });

    it('should have defined size', () => {
      expect(container.props().style.height).to.equal(`${containerSize}px`);
      expect(container.props().style.width).to.equal(`${containerSize}px`);
    });
  });
});
