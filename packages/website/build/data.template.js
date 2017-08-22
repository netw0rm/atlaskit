module.exports = ({ components }) => `/* eslint-disable global-require, quote-props */
/**
 * NOTE:
 *
 * This file is automatically generated by the build process.
 * DO NOT CHANGE IT BY HAND or your changes will be lost.
 *
 * To change the format of this file, modify website/build/data.template.js.
 */
const components = {${components.map(component => `
  '${component.key}': {
    description: '${component.pkg.description}',
    docs: ${component.docs ? `require('../../${component.key}/docs')` : 'false'},
    changelog: ${JSON.stringify(component.changelog)},
    props: ${JSON.stringify(component.props)},
    key: '${component.key}',
    name: '${component.name}',
    packageName: '${component.pkg.name}',
    maintainers: ${JSON.stringify(component.pkg.maintainers || [])},
    isPublished: '${component.isPublished}',
    publishedDate: '${component.lastPublishedOn}',
    version: '${component.pkg.version}',
    versions: [${component.versions.map(v => `'${v}'`).join(', ')}],
    storybooks: [${component.storybooks.map(v => `'${v}'`).join(', ')}],
    isPattern: ${!!component.isPattern},
    supportsDarkMode: ${!!component.supportsDarkMode},
    ${component.nestedDocs
      ? `components: {
        ${component.props.map(({ name }) => `${name}: require('../../${component.key}/docs/components/${name}')`)}
      },`
      : ''
    }
  },
`).join('')}};

export default components;
`;
