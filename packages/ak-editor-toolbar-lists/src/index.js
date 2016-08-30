import { define, vdom, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';
import Button from 'ak-editor-button';
import Icon from 'ak-editor-icon';

/* eslint-disable react/prop-types */
const ToggleButton = (props) => (
  <Button
    onClick={() => !props.disabled && props.emit(`toggle-${props.name}`)}
    className={shadowStyles.locals.button}
    active={props.active}
    disabled={props.disabled}
  >
    <Icon glyph={props.name} {...(props.active ? { fill: 'white' } : {})} />
  </Button>
);
/* eslint-enable react/prop-types */

export default define('ak-editor-toolbar-lists', {
  render(elem) {
    const boundEmit = emit.bind(null, elem); // eslint-disable-line react/jsx-no-bind

    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <ToggleButton
          name="number-list"
          emit={boundEmit}
          active={elem.numberlistActive}
          disabled={elem.numberlistDisabled}
        />
        <ToggleButton
          name="bullet-list"
          emit={boundEmit}
          active={elem.bulletlistActive}
          disabled={elem.bulletlistDisabled}
        />
      </div>
    );
  },
  props: {
    bulletlistActive: prop.boolean({ attribute: true }),
    bulletlistDisabled: prop.boolean({ attribute: true }),
    numberlistActive: prop.boolean({ attribute: true }),
    numberlistDisabled: prop.boolean({ attribute: true }),
  },
});
