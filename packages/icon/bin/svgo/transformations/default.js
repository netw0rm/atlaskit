const SVGO = require('svgo');

const removeNamespacedAttributes = require('../plugins/removeNamespacedAttributes');

module.exports = new SVGO({
  multipass: true,
  plugins: [
    {
      removeTitle: true,
    },
    {
      removeDesc: {
        removeAny: true,
      },
    },
    {
      cleanupIDs: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeXMLNS: true,
    },
    {
      removeNamespacedAttributes,
    },
  ],
});
