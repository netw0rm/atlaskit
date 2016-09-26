/**
 * Removes a component from the target node
 *
 * @param {object} component The component that needs to be removed
 * @param {object} target The target element from which the component needs to be removed
 */
export default function tearDownComponent(component, target = document.body) {
  target.removeChild(component);
}
