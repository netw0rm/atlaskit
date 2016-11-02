import getTooltipElement from './getTooltipElement';

function handleMouseEnter() {
  const trigger = this;
  const tooltip = getTooltipElement(trigger.slotElem.assignedNodes());
  if (tooltip) {
    tooltip.setAttribute('aria-label', trigger.description);
    // TODO this can potentially create leaks
    tooltip.target = tooltip;
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
