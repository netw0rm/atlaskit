const uid = require('uid');

exports.type = 'perItem';

exports.active = true;

exports.description = 'Adds an aria-labelledby and a referenced <title> and <description> section';

exports.params = {
  title: '',
  description: '',
};

exports.fn = function addAriaLabel(item, params) {
  if (item.isElem('svg')) {
    const u = uid();
    const descId = `svg-d-${u}`;
    const titleId = `svg-t-${u}`;

    if (item.hasAttr('aria-labelledby')) {
      item.removeAttr('aria-labelledby');
    }
    item.addAttr({
      name: 'aria-labelledby',
      local: 'aria-labelledby',
      prefix: '',
      value: `${descId} ${titleId}`,
    });

    // TODO: we expect that the description has been removed already
    item.spliceContent(0, 0, new item.constructor({
      elem: 'desc',
      local: 'desc',
      prefix: '',
      content: [new item.constructor({ text: params.description })],
      attrs: [new item.constructor({
        name: 'id',
        local: 'id',
        prefix: '',
        value: descId,
      })],
    }));

    // TODO: we expect that the title has been removed already
    item.spliceContent(0, 0, new item.constructor({
      elem: 'title',
      local: 'title',
      prefix: '',
      content: [new item.constructor({ text: params.title })],
      attrs: [new item.constructor({
        name: 'id',
        local: 'id',
        prefix: '',
        value: titleId,
      })],
    }));
  }
};
