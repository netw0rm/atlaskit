import { define, vdom, Component } from 'skatejs';
import shadowStyles from './shadow.less';

export default define('ak-editor-ui-toolbar', class extends Component {
  static render() {
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div>
    );
  }
});
