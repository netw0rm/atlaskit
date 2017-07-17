const FEATURE_NAME = 'cross-flow';

export default componentName => ([id]) => `${FEATURE_NAME}.${componentName}.${id}`;
