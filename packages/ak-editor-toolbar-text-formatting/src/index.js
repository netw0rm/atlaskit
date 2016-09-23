import { define, vdom, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import 'style!./host.less';
import Button from 'ak-editor-button';
import Icon from 'ak-editor-icon';

/* eslint-disable react/prop-types */
const ToggleButton = (props) => (
  <Button
    onClick={() => !props.disabled
    && props.emit('toggletextformatting', { detail: { mark: props.name } })}
    className={shadowStyles.locals.button + (props.hidden ? ` ${shadowStyles.locals.hidden}` : '')}
    active={props.active}
    disabled={props.disabled}
  >
    <Icon glyph={props.name} {...(props.active ? { fill: 'white' } : {})} />
  </Button>
);
/* eslint-enable react/prop-types */

export default define('ak-editor-toolbar-text-formatting', {
  render(elem) {
    const boundEmit = emit.bind(null, elem); // eslint-disable-line react/jsx-no-bind
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <ToggleButton
          name="bold"
          emit={boundEmit}
          active={elem.boldActive}
          hidden={elem.boldHidden}
          disabled={elem.boldDisabled}
        />
        <ToggleButton
          name="italic"
          emit={boundEmit}
          active={elem.italicActive}
          hidden={elem.italicHidden}
          disabled={elem.italicDisabled}
        />
        <ToggleButton
          name="underline"
          emit={boundEmit}
          active={elem.underlineActive}
          hidden={elem.underlineHidden}
          disabled={elem.underlineDisabled}
        />
        <ToggleButton
          name="code"
          emit={boundEmit}
          active={elem.codeActive}
          hidden={elem.codeHidden}
          disabled={elem.codeDisabled}
        />
      </div>
    );
  },
  props: {
    boldActive: prop.boolean({ attribute: true }),
    italicActive: prop.boolean({ attribute: true }),
    underlineActive: prop.boolean({ attribute: true }),
    codeActive: prop.boolean({ attribute: true }),

    boldDisabled: prop.boolean({ attribute: true }),
    italicDisabled: prop.boolean({ attribute: true }),
    underlineDisabled: prop.boolean({ attribute: true }),
    codeDisabled: prop.boolean({ attribute: true }),

    boldHidden: prop.boolean({ attribute: true }),
    italicHidden: prop.boolean({ attribute: true }),
    underlineHidden: prop.boolean({ attribute: true }),
    codeHidden: prop.boolean({ attribute: true }),
  },
});
