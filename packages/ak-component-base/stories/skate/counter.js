/** @jsx vdom */

import { define, vdom, prop, Component } from 'skatejs';

import base from '../../src';

const Base = base({ Component, prop });

class XCounter extends Base {
  static get props() {
    return {
      count1: prop.number({ default: 1 }),
      count2: prop.number({ default: 2 }),
      ...super.props,
    };
  }

  static attached(elem) {
    setInterval(() => (++elem.count1), 1);
    setInterval(() => (++elem.count2), 1000);
  }

  static render(elem) {
    return [
      <div>Count1: {elem.count1}</div>,
      <div>Count2: {elem.count2}</div>,
    ];
  }
}

const Counter = define('x-counter', XCounter);

export default Counter;
