/**
 * Removes a component from the target node
 *
 * @param {object} component The component that needs to be removed
 * @param {object} [target=document.body] The target element from which the component
 * needs to be removed
 */
export default function tearDownComponent(component, target = document.body) {
  if (component && component.parentNode === target) {
    target.removeChild(component);
  } else if (component) {
    // eslint-disable-next-line no-console
    console.warn('Could not find component', component, 'in given target');
  }
}
