import { define, vdom, prop, emit } from 'skatejs';
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
          onKeyup={elem.onKeyup}
        />
      </div>
    );
  },
  prototype: {
    focus() {
      this.shadowRoot.querySelector(`.${shadowStyles.locals.textInput}`).focus();
    },
    handleInput(event) {
      this.value = event.target.value;
    },
    onKeyup(event) {
      if (event.keyCode === 13) {
        emit(this, 'enterKeyup', { detail: { value: event.target.value } });
      } else if (event.keyCode === 27) {
        emit(this, 'escKeyup');
      }
    },
  },
  props: {
    placeholder: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
});
