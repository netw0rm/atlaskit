const compiledStyles = require('!style-loader!css-loader!less-loader!./index.less');
const icons = require('!raw!./symbol/svg/sprite.symbol.svg');

export default compiledStyles;
export { icons };
