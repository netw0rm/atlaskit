export default (classKeys, props) => {
  const classes = {
    [classKeys.button]: true,
    [classKeys.appearanceDefault]: props.appearance === 'default',
    [classKeys.appearancePrimary]: props.appearance === 'primary' && !props.selected,
    [classKeys.appearanceSubtle]: props.appearance === 'subtle' && !props.disabled && !props.selected,
    [classKeys.appearanceLink]: props.appearance === 'link' && !props.selected,
    [classKeys.spacingCompact]: props.spacing === 'compact',
    [classKeys.spacingNone]: props.spacing === 'none',
    [classKeys.disabled]: props.disabled,
    [classKeys.selected]: props.selected && !props.disabled,
    [classKeys.href]: props.href && !props.disabled,
    [classKeys.themeDefault]: props.theme === 'default',
    [classKeys.themeDark]: props.theme === 'dark',
  };
  if (props.className) {
    props.className.split(' ').forEach(c => (classes[c] = true));
  }
  return classes;
};
