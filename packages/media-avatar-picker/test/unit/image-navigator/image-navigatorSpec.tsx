import * as React from 'react';
import {mount} from 'enzyme';
import {CONTAINER_SIZE, ImageNavigator} from '../../../src/image-navigator';
import {ImageUploader} from '../../../src/image-navigator/styled';
import {ImageCropper} from '../../../src/image-cropper';
import Slider from '@atlaskit/field-range';
import {createMouseEvent, smallImage} from '@atlaskit/media-test-helpers';

describe('Image navigator', () => {
  let component;
  let imageCropper;
  let slider;
  beforeEach(() => {
    component = mount(<ImageNavigator
      imageSource={smallImage}
    />);
    imageCropper = component.find(ImageCropper);
    slider = component.find(Slider);
  });

  it('should have image cropper', () => {
    expect(imageCropper.length).toBe(1);
  });

  it('should have slider', () => {
    expect(slider.length).toBe(1);
  });

  describe('when landscape image is loaded', () => {
    let imageHeight = CONTAINER_SIZE * 2;
    let imageWidth = CONTAINER_SIZE * 4;
    beforeEach(() => {
      imageCropper.props().onImageSize(imageWidth, imageHeight);
    });

    it('should have image width set', () => {
      expect(imageCropper.props().imageWidth).toBe(imageWidth);
    });

    it('should have slider value set', () => {
      expect(slider.props().value).toBe(50);
    });

    it('should have image scale set', () => {
      expect(imageCropper.props().scale).toBe(0.5);
    });

    it('should have min scale set to minimum allowed', () => {
      const expectedMinScale = (CONTAINER_SIZE / 2) / Math.max(imageWidth, imageHeight);
      expect(slider.props().min).toBe(expectedMinScale * 100);
    });
  });

  describe('when portrait image is loaded', () => {
    let imageHeight = CONTAINER_SIZE * 4;
    let imageWidth = CONTAINER_SIZE * 2;
    beforeEach(() => {
      imageCropper.props().onImageSize(imageWidth, imageHeight);
    });

    it('should have image scale set', () => {
      expect(imageCropper.props().scale).toBe(0.5);
    });
  });

  describe('when image is smaller then container', () => {
    let imageHeight = CONTAINER_SIZE / 2;
    let imageWidth = CONTAINER_SIZE / 2;

    beforeEach(() => {
      imageCropper.props().onImageSize(imageWidth, imageHeight);
    });

    it('should have image scale maxed at 1', () => {
      expect(imageCropper.props().scale).toBe(1);
    });
  });

  it('should change scale in state when slider is moved', () => {
    slider.props().onChange(20);
    expect(component.state().scale).toBe(0.2);
  });

  it('should mark state as is dragging when mouse pressed down', () => {
    imageCropper.props().onDragStarted();
    expect(component.state().isDragging).toBe(true);
  });

  it('should mark state as is not dragging when mouse unpressed', () => {
    imageCropper.props().onDragStarted();
    document.dispatchEvent(createMouseEvent('mouseup'));
    expect(component.state().isDragging).toBe(false);
  });

  describe('when image is dragged', () => {
    it('should change state through out dragging', () => {
      const imageInitPos = component.state().imageInitPos;

      imageCropper.props().onDragStarted();
      document.dispatchEvent(createMouseEvent('mousemove', {screenX: 20, screenY: 30}));
      expect(component.state().cursorInitPos).toEqual({x: 20, y: 30});
      expect(component.state().imagePos).toEqual({x: imageInitPos.x, y: imageInitPos.y});

      document.dispatchEvent(createMouseEvent('mousemove', {screenX: 50, screenY: 70}));
      expect(component.state().cursorInitPos).toEqual({x: 20, y: 30});
      expect(component.state().imagePos).toEqual({x: imageInitPos.x + 30, y: imageInitPos.y + 40});

      document.dispatchEvent(createMouseEvent('mouseup'));
      expect(component.state().cursorInitPos).toBe(undefined);
      expect(component.state().imageInitPos).toEqual({x: imageInitPos.x + 30, y: imageInitPos.y + 40});
    });

  });
  describe('when imageSource is not present', () => {
    it('should render ImageUploader to allow users to pick an image', () => {
      const component = mount(<ImageNavigator />);

      expect(component.find(ImageUploader)).toHaveLength(1);
    });
  });
});
