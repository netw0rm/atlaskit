import { define, vdom, prop } from 'skatejs';
import 'style!./host.less';
import shadowStyles from './shadow.less';

export default define('ak-editor-popup-text-input', {
  created(elem) {
    elem.handleInput = elem.handleInput.bind(elem);
  },
  render(elem) {
    return (
      <div className={shadowStyles.locals.container}>
        <style>{shadowStyles.toString()}</style>
        <input
          type="text"
          className={shadowStyles.locals.textInput}
          placeholder={elem.placeholder}
          value={elem.value}
          onInput={elem.handleInput}
        />
      </div>
    );
  },
  prototype: {
    focus() {
      this.shadowRoot.querySelector(`.${shadowStyles.locals.textInput}`).focus();
    },
    handleInput(e) {
      this.value = e.target.value;
    },
  },
  props: {
    placeholder: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
});
