import { define, vdom, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';

export default define('ak-editor-popup-text-input', {
  render(elem) {
    return (
      <div className={shadowStyles.locals.container}>
        <style>{shadowStyles.toString()}</style>
        <input
          type="text"
          className={shadowStyles.locals.textInput}
          placeholder={elem.placeholder}
          value={elem.value}
          onInput={(e) => { elem.value = e.target.value; }}
        />
      </div>
    );
  },
  prototype: {
    focus() {
      this.shadowRoot.querySelector(`.${shadowStyles.locals.textInput}`).focus();
    },
  },
  props: {
    placeholder: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
});
