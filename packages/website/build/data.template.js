module.exports = ({ components }) => `/* eslint-disable global-require, quote-props */
const components = {${components.map(component => `
  '${component.key}': {
    description: '${component.pkg.description}',
    docs: ${component.docs ? `require('../../${component.key}/docs')` : 'false'},
    props: ${JSON.stringify(component.props)},
    key: '${component.key}',
    name: '${component.name}',
    packageName: '${component.pkg.name}',
    maintainers: ${JSON.stringify(component.pkg.maintainers || [])},
    isPublished: '$component.isPublished',
    publishedDate: '${component.lastPublishedOn}',
    version: '${component.pkg.version}',
    versions: [${component.versions.map(v => `'${v}'`).join(', ')}],
    storybooks: [${component.storybooks.map(v => `'${v}'`).join(', ')}],
  },
`).join('')}};

export default components;
`;
