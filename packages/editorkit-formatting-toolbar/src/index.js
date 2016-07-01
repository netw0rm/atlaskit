import { define, vdom, state } from 'skatejs';
import styles from './shadow.css';
import iconBold from '!!idomizer/lib/plugins/idomizer-loader!svgo?removeAttrs=path:fill!./icons/bold.svg';
import iconItalic from '!!idomizer/lib/plugins/idomizer-loader!svgo?removeAttrs=path:fill!./icons/italic.svg';
import iconUnderline from '!!idomizer/lib/plugins/idomizer-loader!svgo?removeAttrs=path:fill!./icons/underline.svg';

const idomizer = (factory, api=vdom.IncrementalDOM) => factory(api)()

const definition = {
  render(elem) {
    return (
      <div className={styles.toolbar}>
        <button>{idomizer(iconBold)}</button>
        <button>{idomizer(iconItalic)}</button>
        <button>{idomizer(iconUnderline)}</button>
      </div>
    );
  },
  ready(elem) {
    state(elem);
  },
};

/* The constructor for our component */
export default () => define('editorkit-formatting-toolbar', definition);

export { definition };
