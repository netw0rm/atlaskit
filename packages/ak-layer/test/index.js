import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { LayerWC } from '../src/index.register';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('ak-layer', () => {
  const layerContainer = document.createElement('div');
  document.body.appendChild(layerContainer);

  it('should be possible to create a component', () => {
    const component = new LayerWC();

    expect(component).to.be.defined;
    expect(component.getAttribute('defined')).not.to.equal(null);
  });

  describe('alignments', () => {
    let component;
    let rectComponent;
    let topDiff;
    let leftDiff;
    const targetNode = document.createElement('div');
    targetNode.style.width = '60px';
    targetNode.style.height = '60px';
    targetNode.style.margin = '100px';
    layerContainer.appendChild(targetNode);
    const rectTarget = targetNode.getBoundingClientRect();

    beforeEach(() => {
      component = new LayerWC();
      component.innerHTML = '<div style="width:10px; height:10px;"></div>';
      component.target = targetNode;
      layerContainer.appendChild(component);
    });

    afterEach(() => {
      layerContainer.removeChild(component);
    });

    it('should support "top left" alignment', (done) => {
      component.position = 'top left';
      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top + rectComponent.height - rectTarget.top;
        leftDiff = rectComponent.left - rectTarget.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "top center" alignment', (done) => {
      component.position = 'top center';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top + rectComponent.height - rectTarget.top;
        leftDiff = rectTarget.left + rectTarget.width / 2 - rectComponent.left - rectComponent.width / 2; // eslint-disable-line max-len
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "top right" alignment', (done) => {
      component.position = 'top right';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top + rectComponent.height - rectTarget.top;
        leftDiff = rectTarget.left + rectTarget.width - rectComponent.left - rectComponent.width;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "right top" alignment', (done) => {
      component.position = 'right top';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top - rectTarget.top;
        leftDiff = rectTarget.left + rectTarget.width - rectComponent.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 50);
    });

    it('should support "right middle" alignment', (done) => {
      component.position = 'right middle';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectTarget.top + rectTarget.height / 2 - rectComponent.top - rectComponent.height / 2; // eslint-disable-line max-len
        leftDiff = rectTarget.left + rectTarget.width - rectComponent.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "right bottom" alignment', (done) => {
      component.position = 'right bottom';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectTarget.top + rectTarget.height - rectComponent.top - rectComponent.height;
        leftDiff = rectTarget.left + rectTarget.width - rectComponent.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "bottom left" alignment', (done) => {
      component.position = 'bottom left';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top - rectTarget.height - rectTarget.top;
        leftDiff = rectComponent.left - rectTarget.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "bottom center" alignment', (done) => {
      component.position = 'bottom center';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top - rectTarget.height - rectTarget.top;
        leftDiff = rectTarget.left + rectTarget.width / 2 - rectComponent.left - rectComponent.width / 2; // eslint-disable-line max-len
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "bottom right" alignment', (done) => {
      component.position = 'bottom right';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top - rectTarget.height - rectTarget.top;
        leftDiff = rectTarget.left + rectTarget.width - rectComponent.left - rectComponent.width;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "left top" alignment', (done) => {
      component.position = 'left top';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectComponent.top - rectTarget.top;
        leftDiff = rectTarget.left - rectComponent.width - rectComponent.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "left middle" alignment', (done) => {
      component.position = 'left middle';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectTarget.top + rectTarget.height / 2 - rectComponent.top - rectComponent.height / 2; // eslint-disable-line max-len
        leftDiff = rectTarget.left - rectComponent.width - rectComponent.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });

    it('should support "left bottom" alignment', (done) => {
      component.position = 'left bottom';

      setTimeout(() => {
        rectComponent = component.getBoundingClientRect();
        topDiff = rectTarget.top + rectTarget.height - rectComponent.top - rectComponent.height; // eslint-disable-line max-len
        leftDiff = rectTarget.left - rectComponent.width - rectComponent.left;
        expect(topDiff).to.equal(0);
        expect(leftDiff).to.equal(0);
        done();
      }, 100);
    });
  });
});
