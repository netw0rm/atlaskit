import { define, vdom, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, no-unused-vars, max-len
import Button from 'editor-button';
import Icon from 'editor-icon';

/* eslint-disable react/prop-types */
const ToggleButton = (props) => (
  <Button
    onclick={() => !props.disabled && props.emit(`toggle-${props.name}`)}
    className={shadowStyles.locals.button}
    active={props.active}
    disabled={props.disabled}
  >
    <Icon glyph={props.name} {...(props.active ? { fill: 'white' } : {})} />
  </Button>
);
/* eslint-enable react/prop-types */

export default define('editor-toolbar-text-formatting', {
  render: (elem) => {
    const boundEmit = emit.bind(null, elem); // eslint-disable-line react/jsx-no-bind
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <ToggleButton
          name="bold"
          emit={boundEmit}
          active={elem.boldActive}
          disabled={elem.boldDisabled}
        />
        <ToggleButton
          name="italic"
          emit={boundEmit}
          active={elem.italicActive}
          disabled={elem.italicDisabled}
        />
        <ToggleButton
          name="underline"
          emit={boundEmit}
          active={elem.underlineActive}
          disabled={elem.underlineDisabled}
        />
      </div>
    );
  },
  props: {
    boldActive: prop.boolean({ attribute: true, default: false }),
    italicActive: prop.boolean({ attribute: true, default: false }),
    underlineActive: prop.boolean({ attribute: true, default: false }),
    boldDisabled: prop.boolean({ attribute: true, default: false }),
    italicDisabled: prop.boolean({ attribute: true, default: false }),
    underlineDisabled: prop.boolean({ attribute: true, default: false }),
  },
});
