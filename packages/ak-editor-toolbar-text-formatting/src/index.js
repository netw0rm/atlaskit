import { define, vdom, prop, emit } from 'skatejs';
import Button from 'ak-editor-button';
import BoldIcon from 'ak-icon/glyph/editor/bold';
import ItalicIcon from 'ak-icon/glyph/editor/italic';
import UnderlineIcon from 'ak-icon/glyph/editor/underline';
import CodeIcon from 'ak-icon/glyph/editor/code';

import 'style!./host.less';

import shadowStyles from './shadow.less';


const FORMATTING_BOLD = 'bold';
const FORMATTING_ITALIC = 'italic';
const FORMATTING_UNDERLINE = 'underline';
const FORMATTING_CODE = 'code';

const formattingIcons = {
  [FORMATTING_BOLD]: BoldIcon,
  [FORMATTING_ITALIC]: ItalicIcon,
  [FORMATTING_UNDERLINE]: UnderlineIcon,
  [FORMATTING_CODE]: CodeIcon,
};

/* eslint-disable react/prop-types */
const ToggleButton = (props) => {
  const Icon = formattingIcons[props.name];
  return (
    <Button
      onClick={() => !props.disabled
      && props.emit('toggletextformatting', { detail: { mark: props.name } })}
      className={
        // TODO replace this string concat with classnames package
        shadowStyles.locals.button + (props.hidden ? ` ${shadowStyles.locals.hidden}` : '')
      }
      active={props.active}
      disabled={props.disabled}
    >
      <Icon {...(props.active ? { style: { color: 'white' } } : {})} />
    </Button>
  );
};
/* eslint-enable react/prop-types */

export default define('ak-editor-toolbar-text-formatting', {
  render(elem) {
    const boundEmit = emit.bind(null, elem); // eslint-disable-line react/jsx-no-bind
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <ToggleButton
          name={FORMATTING_BOLD}
          emit={boundEmit}
          active={elem.boldActive}
          hidden={elem.boldHidden}
          disabled={elem.boldDisabled}
        />
        <ToggleButton
          name={FORMATTING_ITALIC}
          emit={boundEmit}
          active={elem.italicActive}
          hidden={elem.italicHidden}
          disabled={elem.italicDisabled}
        />
        <ToggleButton
          name={FORMATTING_UNDERLINE}
          emit={boundEmit}
          active={elem.underlineActive}
          hidden={elem.underlineHidden}
          disabled={elem.underlineDisabled}
        />
        <ToggleButton
          name={FORMATTING_CODE}
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
