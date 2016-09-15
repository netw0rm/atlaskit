function handleMouseEnter() {
  const trigger = this;
  const tooltipBoundTo = trigger.slotEle.assignedNodes()[0];
  const tooltipID = tooltipBoundTo.getAttribute('aria-describedby');
  if (tooltipID) {
    const tooltip = document.getElementById(tooltipID);
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
  const tooltipBoundTo = trigger.slotEle.assignedNodes()[0];
  const tooltipID = tooltipBoundTo.getAttribute('aria-describedby');
  if (tooltipID) {
    const tooltip = document.getElementById(tooltipID);
    if (tooltip) {
      tooltip.visible = false;
    }
  }
}

export { handleMouseEnter, handleMouseLeave };
