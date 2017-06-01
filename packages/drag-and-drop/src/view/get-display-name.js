export default (Component: ReactComponent) =>
    Component.displayName ||
    Component.name ||
    'Component';
