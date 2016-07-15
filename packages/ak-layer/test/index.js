import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { LayerWC } from '../src/index.register';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

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
  function testAlignmentsBunch(layerContainer, idCounter) {
    const targetNode = createTarget(idCounter);
    let component;

    targetNode.style.margin = '100px';
    layerContainer.appendChild(targetNode);

    beforeEach(() => {
      component = createComponent(idCounter);
      layerContainer.appendChild(component);
    });

    afterEach(() => {
      layerContainer.removeChild(component);
    });

    Object.keys(alignments).forEach((key) => {
      it(`should support ${key} alignment`, (done) => {
        component.position = key;
        testPosition(component, targetNode, key, done);
      });
    });
  }

  function testFlippedBunch(layerContainer, idCounter, bunch) {
    const targetNode = createTarget(idCounter);
    let component;

    layerContainer.appendChild(targetNode);

    beforeEach(() => {
      component = createComponent(idCounter);
      layerContainer.appendChild(component);
    });

    afterEach(() => {
      layerContainer.removeChild(component);
    });

    bunch.forEach((val) => {
      const key = alignments[val].opposite;
      it(`${val} should flip into ${key} position`, (done) => {
        component.position = val;
        testPosition(component, targetNode, key, done);
      });
    });
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
    describe('target and component inside a div without any special options', () => {
      const layerContainer = document.createElement('div');
      document.body.appendChild(layerContainer);
      testAlignmentsBunch(layerContainer, 0);
    });

    describe('target and component inside a container with `position: absolute`', () => {
      // Tether is usually moving the element from the dom in this situation
      // But the inline dialog has a flag 'do not move', so we have to check if it's working
      const layerContainer = document.createElement('div');
      const absoluteParent = document.createElement('div');
      absoluteParent.style.width = '100px';
      absoluteParent.style.height = '100px';
      absoluteParent.style.position = 'absolute';
      absoluteParent.style.top = '100px';
      absoluteParent.style.left = '100px';
      document.body.appendChild(absoluteParent);
      absoluteParent.appendChild(layerContainer);
      testAlignmentsBunch(layerContainer, 1);
    });

    describe('target and component inside a scrollable container with `overflow: auto`', () => {
      const layerContainer = document.createElement('div');
      const scrollableParent = document.createElement('div');
      scrollableParent.style.width = '100px';
      scrollableParent.style.height = '100px';
      scrollableParent.style.margin = '100px';
      scrollableParent.style.overflow = 'auto';
      scrollableParent.appendChild(layerContainer);

      // make the horizontal and vertical scroll inside the parent div
      const scrollableParentInside = document.createElement('div');
      scrollableParentInside.style.width = '300px';
      scrollableParentInside.style.height = '300px';
      scrollableParent.appendChild(scrollableParentInside);

      document.body.appendChild(scrollableParent);
      testAlignmentsBunch(layerContainer, 2);
    });

    describe('should support flipping: left top corner', () => {
      const layerContainer = document.createElement('div');
      layerContainer.style.position = 'absolute';
      layerContainer.style.top = '0';
      layerContainer.style.left = '0';
      document.body.appendChild(layerContainer);

      testFlippedBunch(layerContainer, 3, ['left top', 'left middle', 'left bottom', 'top left', 'top center', 'top right']); // eslint-disable-line max-len
    });

    describe('should support flipping: right bottom corner', () => {
      const layerContainer = document.createElement('div');
      layerContainer.style.position = 'absolute';
      layerContainer.style.bottom = '0';
      layerContainer.style.right = '0';
      document.body.appendChild(layerContainer);

      testFlippedBunch(layerContainer, 4, ['bottom left', 'bottom center', 'bottom right', 'right top', 'right middle', 'right bottom']); // eslint-disable-line max-len
    });
  });
});
