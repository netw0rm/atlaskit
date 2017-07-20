exports.type = 'perItem';

exports.active = true;

exports.description = 'Replaces the primary and secondary hex colours used in Sketch with currentColor and inherit';

// These are the colours that will be used in the Sketch file, and thus in the exported SVG.
const primaryHex = '#42526E';
const secondaryHex = '#79F2C0';

exports.fn = function callbackOnDefinedFill(item) {
  var fill; // eslint-disable-line no-var
  if (item.hasAttr('fill')) {
    fill = item.attr('fill').value;
    if (fill && fill === primaryHex) {
      item.addAttr({
        name: 'fill',
        local: 'fill',
        prefix: '',
        value: 'currentColor',
      });
    }
    if (fill && fill === secondaryHex) {
      item.addAttr({
        name: 'fill',
        local: 'fill',
        prefix: '',
        value: 'inherit',
      });
    }
    if (fill && fill === 'none') {
      item.removeAttr('fill');
    }
  }
};
