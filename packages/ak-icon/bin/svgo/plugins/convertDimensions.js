exports.type = 'full';

exports.active = false;

exports.description = 'removes relative width and height';

// Replace relative dimensions by 100%
exports.fn = function convertDimensions(data) {
  const svg = data.content[0];

  if (svg.isElem('svg')) {
    const viewbox = `0 0 ${svg.attr('width').value} ${svg.attr('height').value}`;
    const svgViewbox = svg.attr('viewbox') || svg.attr('viewBox');
    if (viewbox !== svgViewbox.value) {
      // console.error('dimensions does not fit viewbox');
    }
    svg.removeAttr('width');
    svg.removeAttr('height');

    svg.addAttr({
      name: 'width',
      value: '100%',
      prefix: '',
      local: 'class',
    });
    svg.addAttr({
      name: 'height',
      value: '100%',
      prefix: '',
      local: 'class',
    });
  }

  return data;
};
