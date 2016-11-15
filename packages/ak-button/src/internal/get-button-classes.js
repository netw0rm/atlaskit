import { appearance, spacing, theme } from './enumerated-properties';


const { PRIMARY, SUBTLE, LINK } = appearance.values;
const { DARK } = theme.values;
const { COMPACT, NONE } = spacing.values;

export default (classKeys, props) => ({
  [classKeys.button]: true,
  [classKeys.appearanceDefault]: props.appearance === appearance.values.DEFAULT,
  [classKeys.appearancePrimary]: props.appearance === PRIMARY && !props.selected,
  [classKeys.appearanceSubtle]: props.appearance === SUBTLE && !props.disabled && !props.selected,
  [classKeys.appearanceLink]: props.appearance === LINK && !props.selected,
  [classKeys.spacingCompact]: props.spacing === COMPACT,
  [classKeys.spacingNone]: props.spacing === NONE,
  [classKeys.disabled]: props.disabled,
  [classKeys.selected]: props.selected && !props.disabled,
  [classKeys.href]: props.href && !props.disabled,
  [classKeys.themeDefault]: props.theme === theme.values.DEFAULT,
  [classKeys.themeDark]: props.theme === DARK,
});
