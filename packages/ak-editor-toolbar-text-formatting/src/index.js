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
    className={shadowStyles.locals.button}
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
        {elem.boldHidden ? null :
          <ToggleButton
            name="bold"
            emit={boundEmit}
            active={elem.boldActive}
            disabled={elem.boldDisabled}
          />
        }
        {elem.italicHidden ? null :
          <ToggleButton
            name="italic"
            emit={boundEmit}
            active={elem.italicActive}
            disabled={elem.italicDisabled}
          />
        }
        {elem.underlineHidden ? null :
          <ToggleButton
            name="underline"
            emit={boundEmit}
            active={elem.underlineActive}
            disabled={elem.underlineDisabled}
          />
        }
      </div>
    );
  },
  props: {
    boldActive: prop.boolean({ attribute: true }),
    italicActive: prop.boolean({ attribute: true }),
    underlineActive: prop.boolean({ attribute: true }),
    boldDisabled: prop.boolean({ attribute: true }),
    italicDisabled: prop.boolean({ attribute: true }),
    underlineDisabled: prop.boolean({ attribute: true }),
    boldHidden: prop.boolean({ attribute: true }),
    italicHidden: prop.boolean({ attribute: true }),
    underlineHidden: prop.boolean({ attribute: true }),
  },
});
