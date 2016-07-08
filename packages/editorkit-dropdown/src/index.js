import { define, vdom } from 'skatejs';
import Layer from 'ak-layer';
import styles from './index.less';
import './font-select';
import './options';

export default {
  render() {
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <editorkit-font-select id="editorkit-font-select">
          <Layer open target="#editorkit-font-select">
            <editorkit-option-paragraph></editorkit-option-paragraph>
            <editorkit-option-heading1></editorkit-option-heading1>
            <editorkit-option-heading2></editorkit-option-heading2>
            <editorkit-option-heading3></editorkit-option-heading3>
            <editorkit-option-monospace></editorkit-option-monospace>
          </Layer>
        </editorkit-font-select>
      </div>
    );
  }
}
