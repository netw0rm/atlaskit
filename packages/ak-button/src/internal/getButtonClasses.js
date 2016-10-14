import { appearance } from '../enumeratedProperties';


const { PRIMARY, SUBTLE, LINK } = appearance.values;

export default (classKeys, props) => ({
  [classKeys.button]: true,
  [classKeys.compact]: props.compact,
  [classKeys.disabled]: props.disabled,
  [classKeys.selected]: props.selected && !props.disabled,
  [classKeys.primary]: props.appearance === PRIMARY && !props.disabled && !props.selected,
  [classKeys.subtle]: props.appearance === SUBTLE && !props.disabled && !props.selected,
  [classKeys.link]: props.appearance === LINK && !props.selected,
});
