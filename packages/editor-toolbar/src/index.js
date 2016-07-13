import { define, vdom, state, symbols } from 'skatejs';
import styles from './index.less';

export default define('editor-toolbar', {
  render: () => {
    return (
      <div className={styles.locals.root}>
        <style>{styles.toString()}</style>
        <slot />
      </div>
    );
  }
});
