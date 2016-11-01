import Tooltip from '../';

function getTooltipElement(nodeArray) {
  const validTooltips = nodeArray
    .filter(child => child.nodeType === 1) // filter non-element nodes
    .map(child => child.getAttribute('aria-describedby'))
    .filter(describedBy => !!describedBy) // filter nodes that do not have a proper describedby
    .map(describedBy => document.getElementById(describedBy))
    .filter(allegedTooltip => allegedTooltip instanceof Tooltip); // filter nodes that are not TT

  return validTooltips[0] || null;
}

export default getTooltipElement;
