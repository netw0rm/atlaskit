/** @jsx vdom */

import { define, vdom, prop, emit, Component } from 'skatejs';
import NumberListIcon from 'ak-icon/glyph/editor/list/number';
import BulletListIcon from 'ak-icon/glyph/editor/list/bullet';
import 'style!./host.less';
import shadowStyles from './shadow.less';
import Button from '../Button';

const LIST_NUMBER = 'number-list';
const LIST_BULLET = 'bullet-list';

const listIcons = {
  [LIST_NUMBER]: NumberListIcon,
  [LIST_BULLET]: BulletListIcon,
};

/* eslint-disable react/prop-types */
const ToggleButton = (props) => {
  const Icon = listIcons[props.name];
  return (
    <Button
      onClick={() => !props.disabled && props.emit(`toggle-${props.name}`)}
      className={shadowStyles.locals.button}
      active={props.active}
      disabled={props.disabled}
    >
      <Icon {...(props.active ? { style: { color: 'white' } } : {})} />
    </Button>
  );
};
/* eslint-enable react/prop-types */

export default define('ak-editor-ui-toolbar-lists', class extends Component {
  static created(elem) {
    elem._emit = emit.bind(null, elem);
  }

  static render(elem) {
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <ToggleButton
          name={LIST_NUMBER}
          emit={elem._emit}
          active={elem.numberlistActive}
          disabled={elem.numberlistDisabled}
        />
        <ToggleButton
          name={LIST_BULLET}
          emit={elem._emit}
          active={elem.bulletlistActive}
          disabled={elem.bulletlistDisabled}
        />
      </div>
    );
  }

  static get props() {
    return {
      bulletlistActive: prop.boolean({ attribute: true }),
      bulletlistDisabled: prop.boolean({ attribute: true }),
      numberlistActive: prop.boolean({ attribute: true }),
      numberlistDisabled: prop.boolean({ attribute: true }),
    };
  }
});
