import Tooltip from '../';

const TARGET_ATTRIBUTE = 'aria-describedby';

function isTooltip(element) {
  return element instanceof Tooltip;
}

/**
* Fetches valid target elements (e.g. such ones that reference a {Tooltip})
*
* @private
* @param {Node[]} an array of nodes to check for validity
* @return {Node[]} all elements that correctly reference a tooltip as their target
*/
function getTargetElements(nodeArray) {
  return nodeArray
   .filter((child) => {
     if (child.nodeType !== 1) {
       return false; // filter non-element nodes
     }
     const describedBy = child.getAttribute(TARGET_ATTRIBUTE);
     if (!describedBy) {
       return false; // filter nodes that don't specify a tooltip target
     }
     const targetTooltip = document.getElementById(describedBy);
     if (!targetTooltip || !isTooltip(targetTooltip)) {
       return false; // filter elements with incorrect describedBy
     }
     return true;
   });
}

/**
* Gets the first referenced {Tooltip} element from a given node array
*
* @param {Node[]} An array of nodes allegedly referencing a {Tooltip} element
* @return {Tooltip|null} The first referenced {Tooltip} element or null if none referenced
*/
function getTooltipElement(nodeArray) {
  const validTooltips = getTargetElements(nodeArray)
    .map(child => document.getElementById(child.getAttribute(TARGET_ATTRIBUTE)));

  return validTooltips[0] || null;
}

export { getTooltipElement, getTargetElements };
