import * as React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {StatelessImageCropper, Container, DragOverlay} from '../../src/image-cropper/Stateless';


const imageSource = 'imageUrl';
const imageWidth = 500;
const top = 10;
const left = 20;
const containerSize = 400;

describe('Image cropper', () => {
  let component;
  let img;
  let container;
  let dragOverlay;
  let onDragStartedSpy;

  beforeEach(() => {
    onDragStartedSpy = sinon.spy();
    component = mount(<StatelessImageCropper
      imageSource={imageSource}
      imageWidth={imageWidth}
      containerSize={containerSize}
      top={top}
      left={left}
      onDragStarted={onDragStartedSpy}
    />);
    img = component.find('img');
    container = component.find(Container);
    dragOverlay = component.find(DragOverlay);
  });

  describe('image tag', () => {
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
