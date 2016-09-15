import { Component, define, emit, prop } from 'skatejs';
import { events } from '../src';

export default define('ak-theme-prop', {
  props: {
    name: prop.string({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
  updated(elem, prev) {
    if (Component.updated(elem, prev)) {
      emit(elem, events.prop.change, { detail: { [elem.name]: elem.value } });
    }
  },
});
