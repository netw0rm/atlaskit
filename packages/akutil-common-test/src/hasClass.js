/**
 * @description A simple helper method to check whether a node has a set of classNames on it.
 * @param {Node} component A node to check for classNames.
 * @param {...[String]} classes A list of classnames to check for the existance of
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  const elemIsHidden = hasClass(elem, 'hidden');
 *  const elemIsSelectedAndHidden = hasClass(elem, 'hidden', 'selected');
 */
export default function hasClass(component, ...classes) {
  const componentClasses = component.classList;
  return classes.reduce(
    (acum, className) => acum && (Array.prototype.indexOf.call(componentClasses, className) > -1),
    true
  );
}
