import { define, vdom, prop, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('ak-editor-popup-text-input', {
  render(elem) {
    return (
      <div class={shadowStyles.locals.container}>
        <style>{shadowStyles.toString()}</style>
        <input
          type="text"
          class={shadowStyles.locals.textInput}
          placeholder={elem.placeholder}
          value={elem.value}
          on-input={(e) => { elem.value = e.target.value; }}
        />
      </div>
    );
  },
  prototype: {
    focus() {
      this[symbols.shadowRoot].querySelector(`.${shadowStyles.locals.textInput}`).focus();
    },
  },
  props: {
    placeholder: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
});
