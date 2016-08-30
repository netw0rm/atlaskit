/**
 * @description A simple helper method to check whether a node has a certain className on it.
 * @param {Node} component A node to check for a className on.
 * @param {String} className The className to check for the existance of
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  const elemIsHidden = hasClass(elem, 'hidden');
 */
function hasClass(component, className) {
  return Array.prototype.slice.call(component.classList).indexOf(className) > -1;
}

export default hasClass;
