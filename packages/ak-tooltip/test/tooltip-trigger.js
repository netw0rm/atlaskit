import { getShadowRoot, waitUntil } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Tooltip, { TooltipTrigger } from '../src';
import { handleMouseEnter, handleMouseLeave } from '../src/event-handlers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

function setupComponent() {
  const tooltip = new Tooltip();
  const trigger = new TooltipTrigger();
  const tooltipHasShadowRoot = () => getShadowRoot(tooltip);
  const tooltipTriggerHasShadowRoot = () => getShadowRoot(trigger);

  tooltip.id = 'myTooltip';
  trigger.position = 'top';
  trigger.description = 'This is a tooltip';
  trigger.innerHTML = '<a aria-describedby="myTooltip" href="#">Hover over me!</a>';
  document.body.appendChild(tooltip);
  document.body.appendChild(trigger);

  return waitUntil(tooltipHasShadowRoot)
    .then(() => waitUntil(tooltipTriggerHasShadowRoot))
    // pass references of tooltip and trigger so that we can collect it in beforeEach
    .then(() => ({ tooltip, trigger }));
}

function tearDownComponent(tooltip, trigger) {
  document.body.removeChild(tooltip);
  document.body.removeChild(trigger);
}

describe('ak-tooltip-trigger', () => {
  let tooltip;
  let trigger;
  let shadowRoot; // eslint-disable-line no-unused-vars
  let slottedContent;

  beforeEach(() => setupComponent().then(({ tooltip: newTooltip, trigger: newTrigger }) => {
    tooltip = newTooltip;
    trigger = newTrigger;
    shadowRoot = getShadowRoot(tooltip);
    slottedContent = document.body.querySelector('a');
  }));
  afterEach(() => tearDownComponent(tooltip, trigger));

  it.skip('should open a tooltip when slottedContent gets focus', () => {
    const tooltipIsOpen = () => (tooltip.visible);

    slottedContent.focus();

    return waitUntil(tooltipIsOpen).should.be.fulfilled;
  });

  describe('handleMouseEnter event handler', () => {
    it('should open a tooltip', () => {
      const tooltipIsOpen = () => (tooltip.visible);

      expect(tooltipIsOpen()).to.be.false;
      // bind the function to trigger so that `this` is set properly
      handleMouseEnter.bind(trigger)();

      return waitUntil(tooltipIsOpen).should.be.fulfilled;
    });
  });

  describe('handleMouseLeave event handler', () => {
    it('should close a tooltip', () => {
      const tooltipIsOpen = () => (tooltip.visible);

      // we'll need to set up the negative case first, similar to the handleMouseEnter test
      handleMouseEnter.bind(trigger)();

      return waitUntil(tooltipIsOpen).then(() => {
        // now we can call the mouseLeave event
        handleMouseLeave.bind(trigger)();

        // and wait until the tooltip closes
        return waitUntil(() => (!tooltipIsOpen()));
      }).should.be.fulfilled;
    });
  });
});
