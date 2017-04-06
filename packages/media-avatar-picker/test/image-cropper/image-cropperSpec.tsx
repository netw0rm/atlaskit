import * as React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {ImageCropper, ImageCropperProp} from '../../src/image-cropper/image-cropper';
import {Container, DragOverlay} from '../../src/image-cropper/styled';

const imageWidth = 600;
const imageSource = 'image-url';
const top = 10;
const left = 20;
const containerSize = 400;
const scale = 0.8;

describe('Image cropper', () => {
  let component;
  let img;
  let container;
  let dragOverlay;
  let onDragStartedSpy;
  let onImageWidthSpy;

  const createComponent = (props = {}) => {
    onDragStartedSpy = sinon.spy();
    onImageWidthSpy = sinon.spy();
    const allProps: ImageCropperProp = {
      imageSource,
      scale,
      containerSize,
      top,
      left,
      onDragStarted: onDragStartedSpy,
      onImageWidth: onImageWidthSpy,
      ...props
    };
    component = mount(<ImageCropper {...allProps} />);
    img = component.find('img');
    container = component.find(Container);
    dragOverlay = component.find(DragOverlay);
  };

  describe('with image width', () => {
    beforeEach(() => {
      createComponent({imageWidth});
    });

    describe('image tag', () => {
      it('should have defined source', () => {
        expect(img.props().src).to.equal(imageSource);
      });

      it('should have defined position', () => {
        expect(img.props().style.top).to.equal(`${top}px`);
        expect(img.props().style.left).to.equal(`${left}px`);
      });

      it('should have scaled width', () => {
        expect(img.props().style.width).to.equal(`${imageWidth * scale}px`);
      });
    });

    describe('container', () => {
      it('should have defined size', () => {
        expect(container.props().style.height).to.equal(`${containerSize}px`);
        expect(container.props().style.width).to.equal(`${containerSize}px`);
      });
    });

    it('should call onDragging callback', () => {
      dragOverlay.simulate('mousedown');
      expect(onDragStartedSpy.calledOnce).to.equal(true);
      expect(onDragStartedSpy.getCall(0).args.length).to.equal(0);
    });
  });


  describe('without image width', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should call onImageWidth when image is loaded', () => {
      img.simulate('load', {target: {naturalWidth: imageWidth}});
      expect(onImageWidthSpy.calledOnce).to.equal(true);
      expect(onImageWidthSpy.calledWith(imageWidth)).to.equal(true);
    });
  });
});
