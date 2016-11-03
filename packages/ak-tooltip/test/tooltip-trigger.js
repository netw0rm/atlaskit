import { emit } from 'skatejs';
import { getShadowRoot, waitUntil } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import Tooltip, { TooltipTrigger } from '../src';
import { handleMouseEnter, handleMouseLeave } from '../src/internal/event-handlers';


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
  trigger.innerHTML = 'some<a aria-describedby="myTooltip" href="#">Hover over me!</a>text';
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

  beforeEach(() => setupComponent().then(({ tooltip: newTooltip, trigger: newTrigger }) => {
    tooltip = newTooltip;
    trigger = newTrigger;
  }));
  afterEach(() => tearDownComponent(tooltip, trigger));

  ['focus', 'mouseenter'].forEach((event) => {
    it(`should open a tooltip when ${event} event fired`, () => {
      const tooltipIsOpen = () => (tooltip.visible);

      expect(tooltipIsOpen()).to.be.falsy;
      emit(trigger, event, {});

      return waitUntil(tooltipIsOpen).should.be.fulfilled;
    });
  });

  const tooltipEvents = {
    blur: 'focus',
    mouseleave: 'mouseenter',
  };
  Object.keys(tooltipEvents).forEach((event) => {
    it(`should close a tooltip when ${event} event fired`, () => {
      const tooltipIsOpen = () => (tooltip.visible);

      // set up the negative case and confirm tooltip is open
      emit(trigger, tooltipEvents[event]);
      return waitUntil(tooltipIsOpen).then(() => {
        // now emit the event and check that the tooltip closes
        emit(trigger, event);
        return waitUntil(() => !tooltipIsOpen());
      }).should.be.fulfilled;
    });
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
