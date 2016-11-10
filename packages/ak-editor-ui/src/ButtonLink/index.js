import { vdom, define, prop, Component } from 'skatejs';
import 'style!./host.less';
import shadowStyles from './shadow.less';

export default define('ak-editor-ui-button-link', class extends Component {
  static get props() {
    return {
      href: prop.string({ attribute: true }),
      target: prop.string({ attribute: true }),
    };
  }

  static render(elem) {
    return (
      <a className={shadowStyles.locals.root} href={elem.href} target={elem.target}>
        <style>{shadowStyles.toString()}</style>
        <slot />
      </a>
    );
  }
});
