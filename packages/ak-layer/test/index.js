import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import LayerWC from '../src/index';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const defaultPosition = 'right middle';
const alignments = {
  'top left': {
    top: (rectComponent, rectTarget) => (rectComponent.top + rectComponent.height - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectComponent.left - rectTarget.left),
    opposite: 'bottom left',
  },
  'top center': {
    top: (rectComponent, rectTarget) => (rectComponent.top + rectComponent.height - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width / 2 - rectComponent.left - rectComponent.width / 2), // eslint-disable-line max-len
    opposite: 'bottom center',
  },
  'top right': {
    top: (rectComponent, rectTarget) => (rectComponent.top + rectComponent.height - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width - rectComponent.left - rectComponent.width), // eslint-disable-line max-len
    opposite: 'bottom right',
  },
  'right top': {
    top: (rectComponent, rectTarget) => (rectComponent.top - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width - rectComponent.left),
    opposite: 'left top',
  },
  'right middle': {
    top: (rectComponent, rectTarget) => (rectTarget.top + rectTarget.height / 2 - rectComponent.top - rectComponent.height / 2), // eslint-disable-line max-len
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width - rectComponent.left),
    opposite: 'left middle',
  },
  'right bottom': {
    top: (rectComponent, rectTarget) => (rectTarget.top + rectTarget.height - rectComponent.top - rectComponent.height), // eslint-disable-line max-len
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width - rectComponent.left),
    opposite: 'left bottom',
  },
  'bottom left': {
    top: (rectComponent, rectTarget) => (rectComponent.top - rectTarget.height - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectComponent.left - rectTarget.left),
    opposite: 'top left',
  },
  'bottom center': {
    top: (rectComponent, rectTarget) => (rectComponent.top - rectTarget.height - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width / 2 - rectComponent.left - rectComponent.width / 2), // eslint-disable-line max-len
    opposite: 'top center',
  },
  'bottom right': {
    top: (rectComponent, rectTarget) => (rectComponent.top - rectTarget.height - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectTarget.left + rectTarget.width - rectComponent.left - rectComponent.width), // eslint-disable-line max-len
    opposite: 'top right',
  },
  'left top': {
    top: (rectComponent, rectTarget) => (rectComponent.top - rectTarget.top),
    left: (rectComponent, rectTarget) => (rectTarget.left - rectComponent.width - rectComponent.left), // eslint-disable-line max-len
    opposite: 'right top',
  },
  'left middle': {
    top: (rectComponent, rectTarget) => (rectTarget.top + rectTarget.height / 2 - rectComponent.top - rectComponent.height / 2), // eslint-disable-line max-len
    left: (rectComponent, rectTarget) => (rectTarget.left - rectComponent.width - rectComponent.left), // eslint-disable-line max-len
    opposite: 'right middle',
  },
  'left bottom': {
    top: (rectComponent, rectTarget) => (rectTarget.top + rectTarget.height - rectComponent.top - rectComponent.height), // eslint-disable-line max-len
    left: (rectComponent, rectTarget) => (rectTarget.left - rectComponent.width - rectComponent.left), // eslint-disable-line max-len
    opposite: 'right bottom',
  },
};

describe('ak-layer', () => {
  function createComponent(idCounter) {
    const node = new LayerWC();
    node.innerHTML = '<div style="width:10px; height:10px;"></div>';
    node.target = `#target${idCounter}`;
    return node;
  }

  function createTarget(idCounter) {
    const node = document.createElement('div');
    node.style.width = '60px';
    node.style.height = '60px';
    node.setAttribute('id', `target${idCounter}`);
    return node;
  }
  function testPosition(component, targetNode, key, done) {
    let rectComponent;
    let rectTarget;
    setTimeout(() => {
      rectComponent = component.getBoundingClientRect();
      rectTarget = targetNode.getBoundingClientRect();
      expect(alignments[key].top(rectComponent, rectTarget)).to.equal(0);
      expect(alignments[key].left(rectComponent, rectTarget)).to.equal(0);
      done();
    }, 1);
  }

  let idCounter = 0;
  function getTargetId() {
    return ++idCounter;
  }

  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new LayerWC();
    }).not.to.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  describe('alignments', () => {
    let component;
    let targetNode;
    let layerContainer;

    beforeEach(() => {
      const targetID = getTargetId();
      targetNode = createTarget(targetID);
      layerContainer = document.createElement('div');
      targetNode.style.margin = '100px';

      component = createComponent(targetID);
      layerContainer.appendChild(component);
      layerContainer.appendChild(targetNode);
      document.body.appendChild(layerContainer);
    });

    afterEach(() => {
      document.body.removeChild(layerContainer);
    });

    Object.keys(alignments).forEach((key) => {
      it(`should support ${key} alignment`, (done) => {
        component.position = key;
        testPosition(component, targetNode, key, done);
      });
    });

    Object.keys(alignments).forEach((key) => {
      it(`should support ${key} alignment inside a container with 'position: absolute'`, (done) => {
        // Tether is usually moving the element from the dom in this situation
        // But the layer has a flag 'do not move', so we have to check if it's working
        layerContainer.style.width = '100px';
        layerContainer.style.height = '100px';
        layerContainer.style.position = 'absolute';
        layerContainer.style.top = '100px';
        layerContainer.style.left = '100px';

        component.position = key;
        testPosition(component, targetNode, key, done);
      });
    });

    Object.keys(alignments).forEach((key) => {
      it(`should support ${key} alignment inside a scrollable container with 'overflow: auto'`, (done) => { // eslint-disable-line max-len
        layerContainer.style.width = '100px';
        layerContainer.style.height = '100px';
        layerContainer.style.margin = '100px';
        layerContainer.style.overflow = 'auto';

        // make the horizontal and vertical scroll inside the parent div
        const divInsideScrollable = document.createElement('div');
        divInsideScrollable.style.width = '300px';
        divInsideScrollable.style.height = '300px';
        layerContainer.appendChild(divInsideScrollable);

        component.position = key;
        testPosition(component, targetNode, key, done);
      });
    });

    ['left top', 'left middle', 'left bottom', 'top left', 'top center', 'top right'].forEach((key) => { // eslint-disable-line max-len
      it(`should flip ${key} alignment`, (done) => {
        layerContainer.style.position = 'absolute';
        layerContainer.style.top = '0';
        layerContainer.style.left = '0';

        component.position = key;
        testPosition(component, targetNode, key, done);
      });
    });

    ['bottom left', 'bottom center', 'bottom right', 'right top', 'right middle', 'right bottom'].forEach((key) => { // eslint-disable-line max-len
      it(`should flip ${key} alignment`, (done) => {
        layerContainer.style.position = 'absolute';
        layerContainer.style.bottom = '0';
        layerContainer.style.right = '0';

        component.position = key;
        testPosition(component, targetNode, key, done);
      });
    });

    it(`should be ${defaultPosition}`, (done) => {
      component.position = defaultPosition;
      testPosition(component, targetNode, defaultPosition, done);
    });

    it('incorrect position should results in default position - edge', (done) => {
      component.position = 'top wrong';
      testPosition(component, targetNode, defaultPosition, done);
    });

    it('incorrect position should results in default position - position', (done) => {
      component.position = 'wrong top';
      testPosition(component, targetNode, defaultPosition, done);
    });

    it('incorrect position should results in default position - both', (done) => {
      component.position = 'wrong wrong';
      testPosition(component, targetNode, defaultPosition, done);
    });

    it('incorrect position should results in default position - one missing', (done) => {
      component.position = 'wrong';
      testPosition(component, targetNode, defaultPosition, done);
    });

    it('incorrect position should results in default position - lots of spaces', (done) => {
      component.position = 'top    left';
      testPosition(component, targetNode, defaultPosition, done);
    });
  });
});
