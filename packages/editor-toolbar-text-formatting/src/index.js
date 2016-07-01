import { define, vdom, state, prop, symbols, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import headStyles from 'style!./host.less';
import Button from 'editor-button';
import Icon from 'editor-icon';

// After the bug in beta.11 
// const ToggleButton = (props, chren) => {
//   return <Button
//     onclick={() => !props.disabled && emit(elem, `toggle-${props.name}`)}
//     className={shadowStyles.locals.button}
//     active={props.active}
//     disabled={props.disabled}><Icon glyph={props.name} {...(props.active ? {fill: "white"} : {})}/></Button>
// }
//<ToggleButton name='bold' active={elem.boldActive} disabled={elem.boldDisabled}></ToggleButton>

export default define('editor-toolbar-text-formatting', {
  render: (elem) => {
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <Button
          onclick={() => !elem.boldDisabled && emit(elem, 'toggle-bold')}
          className={shadowStyles.locals.button}
          active={elem.boldActive}
          disabled={elem.boldDisabled}><Icon glyph="bold" {...(elem.boldActive ? {fill: "white"} : {})}/></Button>
        <Button
          onclick={() => !elem.italicDisabled && emit(elem, 'toggle-italic')}
          className={shadowStyles.locals.button}
          active={elem.italicActive}
          disabled={elem.italicDisabled}><Icon glyph="italic" {...(elem.italicActive ? {fill: "white"} : {})}/></Button>
        <Button
          onclick={() => !elem.underlineDisabled && emit(elem, 'toggle-underline')}
          className={shadowStyles.locals.button}
          active={elem.underlineActive}
          disabled={elem.underlineDisabled}><Icon glyph="underline" {...(elem.underlineActive ? {fill: "white"} : {})}/></Button>
      </div>
    );
  },
  props: {
    boldActive: prop.boolean({ attribute: true, default: false}),
    italicActive: prop.boolean({ attribute: true, default: false}),
    underlineActive: prop.boolean({ attribute: true, default: false}),
    boldDisabled: prop.boolean({ attribute: true, default: false}),
    italicDisabled: prop.boolean({ attribute: true, default: false}),
    underlineDisabled: prop.boolean({ attribute: true, default: false}),
  }
});
