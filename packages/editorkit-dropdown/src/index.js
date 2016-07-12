import { define, vdom } from 'skatejs';
import styles from './index.less';
import './font-select';
import './options';

export default {
  render(elem) {
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <editorkit-font-select>
          <editorkit-option-paragraph></editorkit-option-paragraph>
          <editorkit-option-heading1></editorkit-option-heading1>
          <editorkit-option-heading2></editorkit-option-heading2>
          <editorkit-option-heading3></editorkit-option-heading3>
          <editorkit-option-monospace></editorkit-option-monospace>
        </editorkit-font-select>
      </div>
    );
  }
}
