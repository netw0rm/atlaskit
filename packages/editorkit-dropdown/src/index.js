import { define, vdom, state } from 'skatejs';
import styles from './index.less';
import './font-select';
import './options';
import './overlay'

export default {
  render(elem) {
    // console.log(elem)
    //
    // console.log(state(elem))

    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <editorkit-overlay />
        <editorkit-font-select className={styles.locals.dropdown} selectedReadableName={state(elem).selectedReadableName}>
          <editorkit-option-paragraph />
          <editorkit-option-heading1 />
          <editorkit-option-heading2 />
          <editorkit-option-heading3 />
          <editorkit-option-monospace />
        </editorkit-font-select>
      </div>
    );
  },
  ready(elem) {
    // console.log('ready')

    // console.log(elem)
    state(elem, {
      selectedReadableName: 'Paragraph'
    });
    // console.log(state(elem))
  },
  events: {
    selectFont(elem, { target }) {
      console.log('select font')

      state(elem, {
        selectedReadableName: target.readableName
      })

      state(target, {
        open: true
      });

      // console.log(elem.querySelector('ak-layer'))
    },
    toggleDropdown(elem, { target }) {
      console.log('toggle dropdown')

      state(target, {
        open: !target.open
      });
    }
  },
}
