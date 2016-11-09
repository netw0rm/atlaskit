import { appearance, spacing } from './enumerated-properties';


const { PRIMARY, SUBTLE, LINK, DARK, SUBTLEDARK } = appearance.values;
const { COMPACT, NONE } = spacing.values;

export default (classKeys, props) => ({
  [classKeys.button]: true,
  [classKeys.compact]: props.spacing === COMPACT,
  [classKeys.nospacing]: props.spacing === NONE,
  [classKeys.disabled]: props.disabled,
  [classKeys.selected]: props.selected && !props.disabled,
  [classKeys.primary]: props.appearance === PRIMARY && !props.disabled && !props.selected,
  [classKeys.subtle]: props.appearance === SUBTLE && !props.disabled && !props.selected,
  [classKeys.dark]: props.appearance === DARK,
  [classKeys.subtledark]: props.appearance === SUBTLEDARK,
  [classKeys.link]: props.appearance === LINK && !props.selected,
  [classKeys.href]: props.href && !props.disabled,
});
