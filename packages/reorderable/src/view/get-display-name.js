export default (Component: React$Component) =>
    Component.displayName ||
    Component.name ||
    'Component';
