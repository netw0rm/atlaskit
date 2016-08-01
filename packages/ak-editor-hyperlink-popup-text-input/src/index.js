import { define, vdom, prop, symbols } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('ak-editor-hyperlink-popup-text-input', {
  render(elem) {
    return (
      <div className={shadowStyles.locals.container}>
        <style>{shadowStyles.toString()}</style>
        <input
          type="text"
          className={shadowStyles.locals.textInput}
          placeholder={elem.placeholder}
          value={elem.value}
          oninput={(e) => { elem.value = e.target.value; }}
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
    value: prop.string({ attribute: true }),
    placeholder: prop.string({ attribute: true }),
  },
});
