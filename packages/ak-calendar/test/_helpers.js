// any file prefixed with _ will be ignored by Karma when picking up test files
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import { define, vdom } from 'skatejs';
import styles from '../src/styles';
import { style } from 'akutil-common';

const div = document.createElement('div');

function setupComponent(Component) {
  const component = new Component();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  div.appendChild(component);
  document.body.appendChild(div);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent() {
  document.body.removeChild(div);
}

function stylesWrapperConstructor(Constructor) {
  // Wrapper to set computed shadow dom css in the component
  return define(`${Constructor.name}-styles-wrapper-constructor`, class extends Constructor {
    static render(elem) {
      elem.css = style(vdom, styles);
      return super.render(elem);
    }
  });
}

export { setupComponent, tearDownComponent, stylesWrapperConstructor };
