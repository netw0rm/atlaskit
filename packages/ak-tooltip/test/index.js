import { getShadowRoot, waitUntil, hasClass, locateWebComponent } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Tooltip from '../src';
import shadowStyles from '../src/shadow.less';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;
const tooltipClass = `.${shadowStyles.locals.tooltip}`;

function setupComponent() {
  const component = new Tooltip();
  const componentHasShadowRoot = () => getShadowRoot(component);

  // set it to visible so that everything in Layer gets rendered
  component.visible = true;
  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe.skip('ak-tooltip', () => {
  let component;
  let shadowRoot;
  let tooltip;
  let layer;

  function getLayer() {
    return locateWebComponent('ak-layer', shadowRoot)[0] || null;
  }

  beforeEach(() => setupComponent().then((newComponent) => {
    component = newComponent;
    shadowRoot = getShadowRoot(component);
    // a reference the the rendered tooltip (the part that contains the description)
    tooltip = shadowRoot.querySelector(tooltipClass);
    layer = getLayer();
  }));
  afterEach(() => tearDownComponent(component));

  describe('description prop', () => {
    it('should should change displayed description on tooltip', () => {
      const newDescription = 'This is a tooltip';
      const descriptionUpdated = () => (tooltip.innerHTML === newDescription);

      // check the negative case first
      expect(descriptionUpdated()).to.be.false;
      component.description = newDescription;

      return waitUntil(descriptionUpdated).should.be.fulfilled;
    });
  });

  describe('target prop', () => {
    let target;

    beforeEach(() => {
      target = document.createElement('div');
      target.id = 'targetMe';
      document.body.appendChild(target);
    });

    afterEach(() => {
      document.body.removeChild(target);
    });

    it('should change the target attr on the rendered Layer', () => {
      const newTarget = document.body.querySelector('#targetMe');
      const layerTargetUpdated = () => (layer.target === newTarget);

      expect(layerTargetUpdated()).to.be.false;
      component.target = newTarget;

      return waitUntil(layerTargetUpdated).should.be.fulfilled;
    });
  });

  describe('visible prop', () => {
    it('should apply .hidden class to outer div when visible=false', () => {
      const hiddenClass = shadowStyles.locals.hidden;
      const hiddenClassApplied = () => (hasClass(shadowRoot.firstChild, hiddenClass));

      expect(hiddenClassApplied()).to.be.false;
      component.visible = false;

      return waitUntil(hiddenClassApplied).should.be.fulfilled;
    });

    it('should apply an animation class when visible=true', () => {
      const slideRightAnimationClass = shadowStyles.locals.slideRightAnimation;
      const animationClassApplied = () => hasClass(tooltip, slideRightAnimationClass);
      const layerRendered = () => getLayer() !== null;

      // we'll set up the negative case first by setting visible = false
      expect(layerRendered()).to.be.true;
      component.visible = false;

      return waitUntil(() => !layerRendered()).then(() => {
        // set the position to top so we know which animation to look for
        component.position = 'right';
        expect(animationClassApplied()).to.be.false;
        component.visible = true;

        return waitUntil(layerRendered).should.be.fulfilled;
      });
    });

    it('should render Layer when visible=true', () => {
      const layerRendered = () => getLayer() !== null;

      // need to set up the negative case first
      component.visible = false;
      return waitUntil(() => !layerRendered()).then(() => {
        component.visible = true;

        return waitUntil(layerRendered);
      }).should.be.fulfilled;
    });
  });

  describe('position prop', () => {
    it('should pass the position onto the Layer component', () => {
      const newPosition = 'left';
      const expectedLayerPosition = 'left middle';
      const newPositionApplied = () => (layer.position === expectedLayerPosition);

      component.position = 'top';
      expect(newPositionApplied()).to.be.false;
      component.position = newPosition;

      return waitUntil(newPositionApplied).should.be.fulfilled;
    });

    // Each position passed to tooltip needs to be translated to a position that Popper understands
    const positions = {
      top: 'top center',
      bottom: 'bottom center',
      left: 'left middle',
      right: 'right middle',
    };
    Object.keys(positions).forEach((position) => {
      it(`should translate '${position}' to '${positions[position]}' and apply to Layer`, () => {
        const positionApplied = () => (layer.position === positions[position]);

        component.position = position;
        return waitUntil(positionApplied).should.be.fulfilled;
      });
    });
  });
});
