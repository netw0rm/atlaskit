const SVGO = require('svgo');

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
      removePrefixedAttributes: {
        type: 'perItem',
        fn: (item) => {
          item.eachAttr((attr) => {
            if (attr.prefix && attr.local) {
              item.removeAttr(attr.name);
            }
          });
        },
      },
    },
  ],
});
