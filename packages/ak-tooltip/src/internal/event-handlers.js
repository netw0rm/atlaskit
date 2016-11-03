import { getTooltipElement, getTargetElements } from './helpers';

function handleMouseEnter() {
  const trigger = this;
  const targetElements = getTargetElements(trigger.slotElem.assignedNodes());
  const target = targetElements[0];
  const tooltip = getTooltipElement(targetElements);
  if (tooltip) {
    tooltip.setAttribute('aria-label', trigger.description);
    // TODO this can potentially create leaks
    tooltip.target = target;
    tooltip.description = trigger.description;
    tooltip.position = trigger.position;
    tooltip.visible = true;
  }
}

function handleMouseLeave() {
  const trigger = this;
  const tooltip = getTooltipElement(trigger.slotElem.assignedNodes());
  if (tooltip) {
    tooltip.visible = false;
  }
}

export { handleMouseEnter, handleMouseLeave };
