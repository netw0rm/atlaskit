/** @jsx vdom */

import { define, vdom, prop, Component } from 'skatejs';
import shadowStyles from './shadow.less';

export default define('ak-editor-ui-popup-text-input', class extends Component {
  static get props() {
    return {
      placeholder: prop.string({ attribute: true }),
      value: prop.string({ attribute: true }),
    };
  }

  static created(elem) {
    elem.handleInput = elem.handleInput.bind(elem);
  }

  static render(elem) {
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
  }

  focus() {
    if (this.shadowRoot) {
      const textInput = this.shadowRoot.querySelector(`.${shadowStyles.locals.textInput}`);
      if (textInput instanceof HTMLElement) {
        textInput.focus();
      }
    }
  }

  handleInput(e) {
    this.value = e.target.value;
  }
});
