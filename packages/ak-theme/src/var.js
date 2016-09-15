import { define, emit, prop } from 'skatejs';

export default define('ak-theme-var', {
  props: {
    name: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
  updated(elem) {
    emit(elem, 'themevarchanged', { detail: { [elem.name]: elem.value } });
  },
});
