export default (classKeys, props) => {
  const classes = {
    [classKeys.button]: true,
    [classKeys.appearanceDefault]: props.appearance === 'default',
    [classKeys.appearancePrimary]: props.appearance === 'primary' && !props.isSelected,
    [classKeys.appearanceSubtle]: props.appearance === 'subtle' && !props.isDisabled && !props.isSelected,
    [classKeys.appearanceLink]: props.appearance === 'link' && !props.isSelected,
    [classKeys.spacingCompact]: props.spacing === 'compact',
    [classKeys.spacingNone]: props.spacing === 'none',
    [classKeys.disabled]: props.isDisabled,
    [classKeys.selected]: props.isSelected && !props.isDisabled,
    [classKeys.href]: props.href && !props.isDisabled,
    [classKeys.themeDefault]: props.theme === 'default',
    [classKeys.themeDark]: props.theme === 'dark',
  };
  if (props.className) {
    props.className.split(' ').forEach(c => (classes[c] = true));
  }
  return classes;
};
