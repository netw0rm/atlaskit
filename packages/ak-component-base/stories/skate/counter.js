import { define, vdom, prop, Component } from 'skatejs'; // eslint-disable-line no-unused-vars
import React from 'react';

import base from '../../src';


const Base = base({ Component, prop });

class XCounter extends Base {
  get props() {
    return Object.assign({}, {
      count1: prop.number({ default: 1 }),
      count2: prop.number({ default: 2 }),
    }, Base.props);
  }

  attached(elem) {
    setInterval(() => (++elem.count1), 1);
    setInterval(() => (++elem.count2), 1000);
  }

  render(elem) {
    return [
      <div>Count1: {elem.count1}</div>,
      <div>Count2: {elem.count2}</div>,
    ];
  }
}

const Counter = define('x-counter', XCounter);

export default Counter;
