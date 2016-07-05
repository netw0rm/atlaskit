import { define, vdom, state, symbols } from 'skatejs';
import styles from './index.less';
import iconBold from 'editorkit-icons/dist/bold';
import Button from './button';

const render = (patch) => patch(vdom)();

export const name = 'editorkit-toolbar';
export const definition = {
  render: () => (
    <div className={styles.locals.root}>
      <style>{styles.toString()}</style>
      <Button>{render(iconBold)}</Button>
    </div>
  )
};

export default define(name, definition);
