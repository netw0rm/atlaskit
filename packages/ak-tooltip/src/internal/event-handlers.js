function handleMouseEnter() {
  const trigger = this;
  const tooltipBoundTo = trigger.slotElem.assignedNodes()[0];
  if (!tooltipBoundTo) {
    return;
  }
  const tooltipId = tooltipBoundTo.getAttribute('aria-describedby');
  if (tooltipId) {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
      tooltip.setAttribute('aria-label', trigger.description);
      tooltip.target = tooltipBoundTo;
      tooltip.description = trigger.description;
      tooltip.position = trigger.position;
      tooltip.visible = true;
    }
  }
}

function handleMouseLeave() {
  const trigger = this;
  const tooltipBoundTo = trigger.slotElem.assignedNodes()[0];
  const tooltipId = tooltipBoundTo.getAttribute('aria-describedby');
  if (tooltipId) {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
      tooltip.visible = false;
    }
  }
}

export { handleMouseEnter, handleMouseLeave };
