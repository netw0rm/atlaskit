const camelCase = require('camelcase');

exports.type = 'perItem';

exports.active = true;

exports.description = 'convert dash-cased attributes to camelCase';

exports.fn = function removeNamespacedAttributes(item) {
  item.eachAttr((attr) => {
    const camelCaseName = camelCase(attr.name);
    if (camelCaseName !== attr.name) {
      item.addAttr({
        name: camelCaseName,
        local: camelCaseName,
        prefix: '',
        value: attr.value,
      });
      item.removeAttr(attr.name);
    }
  });
};
