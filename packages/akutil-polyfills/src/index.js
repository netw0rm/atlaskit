import 'es6-symbol/implement';
import 'skatejs-web-components';

// Workaround for https://github.com/skatejs/web-components/issues/2
// TODO: when https://github.com/skatejs/web-components/issues/2 is resolved, merge it back into skatejs-web-components
// see https://github.com/webcomponents/webcomponentsjs/pull/594
HTMLElement.prototype = Object.create(HTMLElement.prototype,
  { constructor: { configurable: true, value: HTMLElement, writable: true } }
);
