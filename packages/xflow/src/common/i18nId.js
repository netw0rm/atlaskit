const FEATURE_NAME = 'xflow';

export default componentName => ([id]) => `${FEATURE_NAME}.${componentName}.${id}`;
