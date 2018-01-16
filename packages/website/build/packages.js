/* @flow */

const allPackages = {
  analytics: { key: 'analytics', name: 'Analytics' },
  avatar: { key: 'avatar', name: 'Avatar' },
  badge: { key: 'badge', name: 'Badge' },
  banner: { key: 'banner', name: 'Banner' },
  blanket: { key: 'blanket', name: 'Blanket' },
  breadcrumbs: { key: 'breadcrumbs', name: 'Breadcrumbs' },
  'button-group': { key: 'button-group', name: 'Button Group' },
  button: { key: 'button', name: 'Button' },
  calendar: { key: 'calendar', name: 'Calendar' },
  checkbox: { key: 'checkbox', name: 'Checkbox' },
  code: { key: 'code', name: 'Code' },
  comment: { key: 'comment', name: 'Comment' },
  'dropdown-menu': { key: 'dropdown-menu', name: 'Dropdown Menu' },
  'dynamic-table': { key: 'dynamic-table', name: 'Dynamic Table' },
  'field-radio-group': { key: 'field-radio-group', name: 'Radio Group' },
  'field-range': { key: 'field-range', name: 'Field Range' },
  'field-text-area': { key: 'field-text-area', name: 'Text Field Area' },
  'field-text': { key: 'field-text', name: 'Text Field' },
  flag: { key: 'flag', name: 'Flag' },
  icon: { key: 'icon', name: 'Icon' },
  'inline-dialog': { key: 'inline-dialog', name: 'Inline Dialog' },
  'inline-edit': { key: 'inline-edit', name: 'Inline Edit' },
  'inline-message': { key: 'inline-message', name: 'Inline Message' },
  'layer-manager': { key: 'layer-manager', name: 'Layer Manager' },
  logo: { key: 'logo', name: 'Logo' },
  lozenge: { key: 'lozenge', name: 'Lozenge' },
  'modal-dialog': { key: 'modal-dialog', name: 'Modal Dialog' },
  'multi-select': { key: 'multi-select', name: 'Select (Multi)' },
  navigation: { key: 'navigation', name: 'Navigation' },
  'page-header': { key: 'page-header', name: 'PageHeader' },
  page: { key: 'page', name: 'Page' },
  pagination: { key: 'pagination', name: 'Pagination' },
  'progress-indicator': { key: 'progress-indicator', name: 'Progress Indicator' },
  select: { key: 'select', name: 'Select' },
  'single-select': { key: 'single-select', name: 'Select (Single)' },
  spinner: { key: 'spinner', name: 'Spinner' },
  tabs: { key: 'tabs', name: 'Tabs' },
  'tag-group': { key: 'tag-group', name: 'Tag Group' },
  tag: { key: 'tag', name: 'Tag' },
  theme: { key: 'theme', name: 'Theme' },
  toggle: { key: 'toggle', name: 'Toggle' },
  tooltip: { key: 'tooltip', name: 'Tooltip' },
};

Object.keys(allPackages).forEach(key => {
  allPackages[key].pkg = {
    name: `@atlaskit/${key}`,
  };
});

module.exports = {
  allPackages,
  packageList: Object.keys(allPackages).map(key => allPackages[key]),
};
