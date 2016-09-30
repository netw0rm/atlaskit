import 'style!./styles/FieldBaseHost.less';
import { vdom, define, prop } from 'skatejs';
// import shadowStyles from './styles/FieldBase.less';
import Root from './Root';
import Label from './Label';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class utilFieldBase
 * @example @js import utilFieldBase from 'akutil-field-base';
 * const component = new utilFieldBase();
 */
export default define('ak-field-base', {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <Root>
        <Label label={elem.label}>
          <slot></slot>
        </Label>
      </Root>
    );
  },
  props: {
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof FieldBase
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
  },
});
