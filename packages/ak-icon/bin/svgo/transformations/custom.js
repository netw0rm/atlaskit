const SVGO = require('svgo');
const uid = require('uid');
const addPresentationAttribute = require('../plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('../plugins/callbackOnDefinedFill');

/**
* Runs custom transformations on an SVG
*
* @param {Function} fillCallback A callback that gets invoked if a defined fill color has been found
* @return {SVGO} an SVGO instance
*/
module.exports = (fillCallback) => {
  callbackOnDefinedFill.params.callback = fillCallback;
  const svgo = new SVGO({
    full: true,
    plugins: [
      {
        addAttributesToSVGElement: {
          attributes: ['{...props}'],
        },
      },
      {
        addPresentationAttribute,
      },
      {
        callbackOnDefinedFill,
      },
      {
        injectTitleAndDescription: {
          type: 'perItem',
          fn: (item) => {
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
              item.spliceContent(0, 0, svgo.createContentItem({
                elem: 'desc',
                local: 'desc',
                prefix: '',
                content: [svgo.createContentItem({ text: '{description}' })],
                attrs: [svgo.createContentItem({
                  name: 'id',
                  local: 'id',
                  prefix: '',
                  value: descId,
                })],
              }));

              // TODO: we expect that the title has been removed already
              item.spliceContent(0, 0, svgo.createContentItem({
                elem: 'title',
                local: 'title',
                prefix: '',
                content: [svgo.createContentItem({ text: '{title}' })],
                attrs: [svgo.createContentItem({
                  name: 'id',
                  local: 'id',
                  prefix: '',
                  value: titleId,
                })],
              }));
            }
          },
        },
      },
    ],
  });
  return svgo;
};
