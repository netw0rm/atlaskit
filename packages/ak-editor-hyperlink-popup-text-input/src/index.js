import { define, vdom, prop } from 'skatejs';
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

  props: {
    value: prop.string({ attribute: true }),
    placeholder: prop.string({ attribute: true }),
  },
});
