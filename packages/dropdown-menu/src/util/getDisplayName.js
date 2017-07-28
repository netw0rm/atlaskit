// @flow
// from https://facebook.github.io/react/docs/higher-order-components.html

// $FlowFixMe
const getDisplayName = WrappedComponent => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
);

export default getDisplayName;
