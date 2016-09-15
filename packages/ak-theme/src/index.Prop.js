import { Component, define, emit, prop } from 'skatejs';
import { prop as eProp } from '../src/index.events';

export default define('ak-theme-prop', {
  props: {
    name: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
  updated(elem, prev) {
    if (Component.updated(elem, prev)) {
      emit(elem, eProp.change, { detail: { [elem.name]: elem.value } });
    }
  },
});
