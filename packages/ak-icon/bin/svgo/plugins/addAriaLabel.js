const uid = require('uid');

exports.type = 'perItem';

exports.active = true;

exports.description = 'Adds an aria-labelledby and a referenced <title> and <description> section';

exports.params = {
  title: '',
  desc: '',
};

exports.fn = function addAriaLabel(item, params) {
  if (item.isElem('svg')) {
    const ids = [];
    const u = uid();

    ['desc', 'title'].forEach((elem) => {
      const value = params[elem];
      if (value) {
        const id = `${elem}-${u}`;
        ids.push(id);
        // TODO: we expect that the old element of the same type has been removed already
        item.spliceContent(0, 0, new item.constructor({
          elem,
          local: elem,
          prefix: '',
          content: [new item.constructor({ text: value })],
          attrs: [new item.constructor({
            name: 'id',
            local: 'id',
            prefix: '',
            value: id,
          })],
        }));
      }
    });

    if (ids.length) {
      if (item.hasAttr('aria-labelledby')) {
        item.removeAttr('aria-labelledby');
      }
      item.addAttr({
        name: 'aria-labelledby',
        local: 'aria-labelledby',
        prefix: '',
        value: ids.join(' '),
      });
    }
  }
};
