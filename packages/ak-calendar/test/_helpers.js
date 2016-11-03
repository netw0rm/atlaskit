// any file prefixed with _ will be ignored by Karma when picking up test files
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import { define, vdom, props } from 'skatejs';
import { style } from 'akutil-common';
import { $now } from '../src/index.symbols';

const div = document.createElement('div');
const currentDate = new Date();

function setupComponent(Component, { now = currentDate } = {}) {
  const component = new Component();
  props(component, {
    [$now]: now,
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  div.appendChild(component);
  document.body.appendChild(div);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent() {
  document.body.removeChild(div);
}

function stylesWrapperConstructor(Constructor, styles) {
  // Wrapper to set computed shadow dom css in the component
  return define(`${Constructor.name}-styles-wrapper-constructor`, class extends Constructor {
    static render(elem) {
      elem.css = style(vdom, styles);
      return super.render(elem);
    }
  });
}

export { setupComponent, tearDownComponent, stylesWrapperConstructor };
